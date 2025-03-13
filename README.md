# 🚀 AI Powered PPT Generator using NestJS

This project is an **AI-powered PowerPoint generator** built with **NestJS**. It uses **Mistral AI** to generate slide content based on a specified topic and number of slides. The generated content can then be converted into a PowerPoint presentation.

---

## 📚 **Features**

✅ Generate slide content dynamically using Mistral AI  
✅ Configurable number of slides  
✅ Clean and scalable NestJS architecture  
✅ REST API for generating presentations

---

## ⚙️ **Setup Instructions**

### 1. **Clone the repository**

```bash
git clone <repo-url>
cd ai-ppt-generator-main
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Set up environment variables**

Create a `.env` file in the root directory:

```
MISTRAL_BASE_URL=<your-mistral-api-url>
MISTRAL_API_KEY=<your-mistral-api-key>
```

### 4. **Run the application**

```bash
npm run start
```

---

## 🚦 **API Endpoints**

### **1. Generate Presentation**

**POST** `/ppt/generate`

**Request Body:**

```json
{
  "topic": "Artificial Intelligence",
  "slideCount": 5
}
```

**Example cURL:**

```bash
curl -X POST http://localhost:3000/ppt/generate \
-H "Content-Type: application/json" \
-d '{"topic": "Artificial Intelligence", "slideCount": 5}' \
-o output.pptx
```

---

## 🛠️ Tech Stack

- **NestJS** – Backend framework
- **Mistral AI** – Language model for content generation
- **PPTX-GenJS** – PowerPoint generation library
- **TypeScript** – Type-safe development

---

## 🐞 Troubleshooting

| Problem            | Solution                                                 |
| ------------------ | -------------------------------------------------------- |
| `Model not found`  | Check your Mistral API key and permissions               |
| `Empty slides`     | Ensure slide content is properly passed to the generator |
| `Alignment issues` | Adjust `x`, `y`, `w`, `h` values in `addText` options    |

---

## 🏆 Best Practices

✅ Keep slide content under 800 characters to prevent overflow  
✅ Adjust font size dynamically for better readability  
✅ Use consistent styling for a professional look

---

## 👨‍💻 **Author**

**Arun Kumar Dorepally**  
[GitHub](https://github.com/arunkumar-ti) | [LinkedIn](https://www.linkedin.com/in/arun-kumar-dorepally)

---

## 📄 **License**

This project is licensed under the **MIT License**.
