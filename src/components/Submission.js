export default function FileUpload() {
    const [file, setFile] = useState(null);
    
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('hwFile', file);
      
      try {
        const response = await axios.post('/api/submit', formData);
        alert(`Submission ID: ${response.data.id}`);
      } catch (error) {
        alert('Upload failed');
      }
    };
  
    return (
      <div>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button 
          onClick={handleSubmit}
          disabled={!file}
        >
          Submit
        </button>
      </div>
    );
  }
  