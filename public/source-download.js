async function downloadSource() {
    const btn = document.getElementById('downloadBtn');
    const status = document.getElementById('downloadStatus');

    btn.disabled = true;
    btn.textContent = 'Preparing Download...';
    status.textContent = 'Please wait while we prepare your download...';

    try {
        const files = [
            'index.html',
            'resistor-color-code.html',
            'resistor-color-code.js',
            'series-resistance.html',
            'series-resistance.js',
            'parallel-resistance.html',
            'parallel-resistance.js',
            'voltage-divider.html',
            'voltage-divider.js',
            'about.html',
            'contact.html',
            'contact.js',
            'privacy-policy.html',
            'disclaimer.html',
            'terms.html',
            'source-download.html',
            'source-download.js',
            'styles.css',
            'navigation.js'
        ];

        const zip = {
            files: {},
            addFile: function(name, content) {
                this.files[name] = content;
            }
        };

        for (const filename of files) {
            try {
                const response = await fetch(filename);
                const content = await response.text();
                zip.addFile(filename, content);
            } catch (err) {
                console.error(`Error loading ${filename}:`, err);
            }
        }

        const zipContent = createZipFile(zip.files);

        const blob = new Blob([zipContent], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'ohmlab-source-code.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        status.textContent = 'Download started! Check your downloads folder.';
        status.style.color = 'var(--primary-color)';

        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = 'Download Full Source Code';
            status.textContent = '';
        }, 3000);

    } catch (error) {
        console.error('Download error:', error);
        status.textContent = 'Download failed. Please try again.';
        status.style.color = '#F44336';
        btn.disabled = false;
        btn.textContent = 'Download Full Source Code';
    }
}

function createZipFile(files) {
    let content = 'This is a simplified representation of the source files.\n\n';
    content += 'Files included:\n';
    content += Object.keys(files).join('\n');
    content += '\n\nNote: For a functional website, please copy the files from the public directory.';
    return content;
}
