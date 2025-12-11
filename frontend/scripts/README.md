Fix and diagnostics scripts for MongoDB configuration

fix_mongod_unrecognized_options.sh
- Purpose: Detect and safely convert "dotted" keys in `/etc/mongod.conf` (e.g. `processManagement.authorization`) that older/newer `mongod` versions reject.
- Usage (dry-run): `sudo bash fix_mongod_unrecognized_options.sh` - shows a diff.
- Usage (apply): `sudo bash fix_mongod_unrecognized_options.sh --apply` - moves the file, restarts `mongod`.

Recommended steps:
1. Copy the script to the VM (gcloud or scp).
2. Run the script without `--apply` and inspect the diff.
3. If the diff looks correct, re-run with `--apply`.
4. If `mongod` fails after applying, restore using the backup file shown in the output.

Security / safety notes:
- Always review the diff before applying.
- If you need to expose your MongoDB port, prefer a firewall rule limited to your IP or an SSH tunnel.

Example scp to VM:
`scp scripts/fix_mongod_unrecognized_options.sh jerjesmolina@jerjesm.online:~`

Example gcloud scp:
`gcloud compute scp scripts/fix_mongod_unrecognized_options.sh around:~ --zone ZONA` 
