const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFile = 'sold_inventory.csv'; // Replace with your input file path
const outputFile = 'sold_inventory_parsed.csv'; // Replace with your desired output file path
const headers = [
  { id: 'Invoice ID', title: 'Invoice ID' },
  { id: 'Invoice Date', title: 'Invoice Date' },
  { id: 'Created By', title: 'Created By' },
  { id: 'External Ref.', title: 'External Ref.' },
  { id: 'Customer', title: 'Customer' },
  { id: 'Purchase ID', title: 'Purchase ID' },
  { id: 'Vendor', title: 'Vendor' },
  { id: 'Event Type', title: 'Event Type' },
  { id: 'Category', title: 'Category' },
  { id: 'Performer', title: 'Performer' },
  { id: 'Event Name', title: 'Event Name' },
  { id: 'Event ID', title: 'Event ID' },
  { id: 'Event Date', title: 'Event Date' },
  { id: 'Venue', title: 'Venue' },
  { id: 'State', title: 'State' },
  { id: 'Section', title: 'Section' },
  { id: 'Row', title: 'Row' },
  { id: 'Seats', title: 'Seats' },
  { id: 'QTY', title: 'QTY' },
  { id: 'Stock Type', title: 'Stock Type' },
  { id: 'Electronic Transfer', title: 'Electronic Transfer' },
  { id: 'In-Hand Date', title: 'In-Hand Date' },
  { id: 'Public Notes', title: 'Public Notes' },
  { id: 'Internal Notes', title: 'Internal Notes' },
  { id: 'Total Cost', title: 'Total Cost' },
  { id: 'Unit Cost', title: 'Unit Cost' },
  { id: 'Total', title: 'Total' },
  { id: 'Unit Ticket Sales', title: 'Unit Ticket Sales' },
  { id: 'Profit', title: 'Profit' },
  { id: '% Profit Margin', title: '% Profit Margin' },
  { id: 'Payment Status', title: 'Payment Status' },
  { id: 'Fulfillment Status', title: 'Fulfillment Status' },
  { id: 'Fulfillment Date', title: 'Fulfillment Date' },
  { id: 'Zone Seating', title: 'Zone Seating' },
  { id: 'PDFs/Barcodes Attached', title: 'PDFs/Barcodes Attached' },
  { id: 'Received', title: 'Received' },
  { id: 'Event Tags', title: 'Event Tags' },
  { id: 'Invoice Tags', title: 'Invoice Tags' },
  { id: 'Inventory Tags', title: 'Inventory Tags' },
  { id: 'Email', title: 'Email' } // New column for Email
];


// Setup CSV Writer
const csvWriter = createCsvWriter({
  path: outputFile,
  header: headers
});


const data = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Extract email using regular expression
    const emailMatch = row['Internal Notes'].match(/\S+@\S+\.\S+/);
    // Add a new property for Email
    row['Email'] = emailMatch ? emailMatch[0] : '';

    data.push(row);
  })
  .on('end', () => {
    csvWriter.writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  });
