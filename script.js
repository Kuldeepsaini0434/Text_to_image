    const API_URL = "https://083741d98fac.ngrok-free.app/generate";  //your API URL
    let currentImage = null;

    async function generateImage() {
      const prompt = document.getElementById("prompt").value;
      const loading = document.getElementById("loading");
      const img = document.getElementById("result");
      const downloadBtn = document.getElementById("downloadBtn");

      if (!prompt) {
        alert("Please enter a prompt!");
        return;
      }

      loading.style.display = "block";
      img.style.display = "none";
      downloadBtn.style.display = "none";

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });
        if (!res.ok) throw new Error("Server error " + res.status);
        const data = await res.json();
        currentImage = "data:image/png;base64," + data.image;
        img.src = currentImage;
        img.style.display = "block";
        downloadBtn.style.display = "inline-block";
      } catch (err) {
        alert("❌ Error: " + err.message);
      } finally {
        loading.style.display = "none";
      }
    }

    function downloadImage() {
      if (!currentImage) return;
      const a = document.createElement("a");
      a.href = currentImage;
      a.download = "generated.png";
      a.click();
    }

  
