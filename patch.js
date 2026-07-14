import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\/\/ Fetch large base64 fields from Firestore chunks[\s\S]*?return \(\) => unsub\(\);\n  }, \[\]\);/;

const replacement = `// Fetch large base64 fields from Firestore chunks
    Promise.allSettled([
      loadLargeData('resumeImage').then(data => {
        if (data !== null) setResumeImage(data);
      }),
      loadLargeData('seoImages').then(data => {
        if (data !== null) {
          try {
            const parsed = JSON.parse(data);
            setSeoImages(parsed);
          } catch (e) {
            console.error('Failed to parse seoImages chunks', e);
          }
        }
      })
    ]).finally(() => {
      setLargeDataLoaded(true);
    });

    return () => unsub();
  }, []);`;

if (regex.test(code)) {
  fs.writeFileSync('src/App.tsx', code.replace(regex, replacement));
  console.log("Patched successfully via regex");
} else {
  console.log("Regex not found!");
}
