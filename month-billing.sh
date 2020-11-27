# Script to monthly aumatic billing via a cron job
# Command to setup this job to run every 1st day of the month
# 0 0 1 * * /root/month-billing.sh
printf "Starting the automatic billing month job\n" 
curl -X POST -H "Content-Type: application/json" http://localhost:8080/automatic-billing/register-month
printf "\nFinishing the job"