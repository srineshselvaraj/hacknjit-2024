import pytesseract
from PIL import Image
from PyPDF2 import PdfReader

def read_image_file(file_path):
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image)
    return text

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text
