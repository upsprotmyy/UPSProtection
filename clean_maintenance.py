import re

with open('maintenance.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all customer data (4th column) from table rows
content = re.sub(r'(<td>[^<]*</td><td>[^<]*</td><td>[^<]*</td>)<td>[^<]*</td></tr>', r'\1</tr>', content)

with open('maintenance.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("All customer data removed from maintenance.html")