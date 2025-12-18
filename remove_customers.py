import re

# Files to process
files = ['substation.html', 'maintenance.html', 'transformer.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove customer column from table data rows
    # Pattern: </td><td>Customer Name</td></tr>
    content = re.sub(r'</td><td>[^<]+</td></tr>', '</td></tr>', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Customer columns removed from all project portfolio pages")