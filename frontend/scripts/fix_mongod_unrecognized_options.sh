#!/usr/bin/env bash
# fix_mongod_unrecognized_options.sh
# Detecta opciones no reconocidas en journal y corrige líneas dot-notation del archivo /etc/mongod.conf.
# Uso:
#  - Dry-run: sudo bash fix_mongod_unrecognized_options.sh
#  - Aplicar: sudo bash fix_mongod_unrecognized_options.sh --apply
set -euo pipefail

CONF="/etc/mongod.conf"
BACKUP="${CONF}.bak.$(date +%s)"
# Target tmp path for the proposed corrected config file
TMP="/tmp/mongod.conf.new.$(date +%s)"
TMP_DEFAULT_NO_TS="/tmp/mongod.conf.new"
APPLY=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --apply) APPLY=true; shift ;;
    *) echo "Unknown arg $1"; exit 1 ;;
  esac
  dot_re = re.compile(r'^(\s*)([A-Za-z0-9_]+)\.([A-Za-z0-9_\.]+)\s*:\s*(.*)$')
  auth_re = re.compile(r'^(\s*)authorization\s*:\s*(.*)$')
  security_block_re = re.compile(r'^\s*security\s*:\s*$')
  idx = 0
  while idx < len(lines):
    ln = lines[idx]
    m = dot_re.match(ln)
    if m:

if [[ ! -f "${CONF}" ]]; then
  echo "No existe ${CONF}, abortando."
  exit 1
fi

echo "Creando backup en: ${BACKUP}"
sudo cp "${CONF}" "${BACKUP}"

echo "Extrayendo avisos recientes de journalctl sobre opciones no reconocidas (si las hay):"
sudo journalctl -u mongod -n 400 --no-pager | grep -E 'Unrecognized option' || true

echo
echo "Mostrando /etc/mongod.conf (preview):"
        idx += 1
        continue

echo
echo "Generando propuesta de archivo corregido en: ${TMP}"

sudo env TMP=${TMP} python3 - <<'PY'
import re,os
src = "/etc/mongod.conf"
dst = os.environ.get('TMP', '/tmp/mongod.conf.new')
lines = open(src, 'r', encoding='utf-8').read().splitlines()
out = []
dot_re = re.compile(r'^(\s*)([A-Za-z0-9_]+)\.([A-Za-z0-9_\.]+)\s*:\s*(.*)$')
      idx += 1
    else:
      am = auth_re.match(ln)
      if am:
        indent = am.group(1)
        val = am.group(2).strip()
        j = idx - 1
        found_sec = False
        while j >= 0:
          prev = lines[j].strip()
          if prev == '' or prev.startswith('#'):
            j -= 1
            continue
          if security_block_re.match(prev):
            found_sec = True
          break
        if found_sec:
          out.append(ln)
        else:
          out.append(f"{indent}# FIXED: moved top-level authorization into security.authorization (was: {val})")
          out.append(f"{indent}security:")
          out.append(f"{indent}  authorization: {val}")
      else:
        out.append(ln)
      idx += 1
    m = dot_re.match(ln)
    if m:
        indent = m.group(1)
        top = m.group(2)
        rest = m.group(3)
        val = m.group(4).strip()
        # Specific heuristic: move processManagement.authorization -> security.authorization
        if top == 'processManagement' and rest == 'authorization':
            v = val.lower()
            if v in ('true','1','yes','enabled','on'):
                v = 'enabled'
            else:
                v = 'disabled'
            out.append(f"{indent}# FIXED: moved processManagement.authorization into security.authorization (was: {val})")
            out.append(f"{indent}security:")
            out.append(f"{indent}  authorization: {v}")
            continue
        # General conversion from dotted keys a.b.c: val into nested YAML
        parts = rest.split('.')
        out.append(f"{indent}# FIXED: converted dotted-key {top}.{rest} into nested YAML")
        out.append(f"{indent}{top}:")
        level_indent = indent + '  '
        for i, x in enumerate(parts):
            if i == len(parts)-1:
                out.append(f"{level_indent}{x}: {val}")
            else:
                out.append(f"{level_indent}{x}:")
                level_indent += '  '
        continue
    out.append(ln)
open(dst, 'w', encoding='utf-8').write('\n'.join(out)+"\n")
print('Done. Proposed new file at', dst)
PY

echo
if [ ! -f "${TMP}" ] && [ -f "${TMP_DEFAULT_NO_TS}" ]; then
  echo "Found ${TMP_DEFAULT_NO_TS}; moving to ${TMP}"
  sudo mv "${TMP_DEFAULT_NO_TS}" "${TMP}"
fi

echo "Mostrando diferencias (original -> proposal):"
sudo diff -u "${CONF}" "${TMP}" || true

if [ "${APPLY}" = true ]; then
  echo "Aplicando cambios: moviendo ${TMP} -> ${CONF} (backup en ${BACKUP})"
  sudo mv "${TMP}" "${CONF}"
  echo "Recargando systemd y reiniciando mongod..."
  sudo systemctl daemon-reload || true
  sudo systemctl restart mongod || true
  echo
  sudo systemctl status mongod -l --no-pager || true
  echo "Si algo falla: restaurar backup y reiniciar:"
  echo "sudo cp ${BACKUP} ${CONF} && sudo systemctl restart mongod"
else
  echo
  echo "Dry-run completado. Si estás de acuerdo con los cambios, ejecuta con --apply:" 
  echo "sudo bash fix_mongod_unrecognized_options.sh --apply"
fi

exit 0
