// Task 6: Import required modules
const fs = require('fs');
const path = require('path');

// Task 7: Create the file path using __dirname and path.join()
const filePath = path.join(__dirname, 'data', 'student.txt');

// Task 8: Read the file using fs.readFile() with 'utf8' encoding
fs.readFile(filePath, 'utf8', (err, data) => {
    // Task 9: Handle errors
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }

    // Task 10: Display student details
    console.log('Student Details:');
    console.log(data);

    // Task 11: Display the file name
    console.log('File Name:', path.basename(filePath));

    // Task 12: Display the directory path
    console.log('Directory:', path.dirname(filePath));

    // Task 13: Display the file extension
    console.log('File Extension:', path.extname(filePath));
});