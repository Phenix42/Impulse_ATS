const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors()); // Add this line
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the ATS API. Use the /compare endpoint to compare text with PDF.');
});

app.post('/compare', async (req, res) => {
  try {
    const { textInput } = req.body;
    const pdfFile = req.files ? req.files.pdfFile : null;

    if (!pdfFile || !textInput) {
      return res.status(400).send('PDF file and text input are required');
    }

    const pdfText = await pdfParse(pdfFile.data);
    const matchPercentage = compareText(textInput, pdfText.text);

    res.json({ matchPercentage });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

function compareText(textInput, pdfText) {
  const tokenizer = new natural.WordTokenizer();
  const inputTokens = tokenizer.tokenize(textInput.toLowerCase());
  const pdfTokens = tokenizer.tokenize(pdfText.toLowerCase());

  const inputKeywords = extractKeywords(inputTokens);
  const pdfKeywords = extractKeywords(pdfTokens);

  const matchCount = inputKeywords.filter(word => pdfKeywords.includes(word)).length;
  const matchPercentage = (matchCount / inputKeywords.length) * 100;

  return matchPercentage.toFixed(2);
}

function extractKeywords(tokens) {
  const tfidf = new TfIdf();
  tfidf.addDocument(tokens.join(' '));

  const importantWords = [];
  tfidf.listTerms(0).forEach(item => {
    if (item.tfidf > 0.1) { // Adjust the threshold as needed
      importantWords.push(item.term);
    }
  });

  return importantWords;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
