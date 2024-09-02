#!/bin/bash

# Generate Allure report
npx allure generate allure-results --clean -o allure-report

# Find the URL of the generated report
report_url="file://$(pwd)/allure-report/index.html"

# Output the URL to a file
echo "$report_url" > report_url.txt

# Terminla permission 
# chmod +x export_allure_report.sh
# Execute the script
# ./export_allure_report.sh
