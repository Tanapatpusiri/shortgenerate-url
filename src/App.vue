
 
<template>
  <div class="bg-blue-500 min-h-screen py-10">
    <div class="container mx-auto">
      <h1 class="text-center text-3xl font-bold text-white mb-6">Short URL Generator</h1>
      <div class="flex justify-center">
        <div class="box bg-white p-6 rounded-lg shadow-lg mb-20 w-full md:w-2/3 lg:w-1/2 xl:w-3/4">
          <form @submit.prevent="generateShortURL">
            <div class="mb-4">
              <input v-model="originalURL" class="w-full px-4 py-2 border rounded-md" placeholder="Enter URL" />
            </div>
            <div class="flex justify-center space-x-4">
              <button type="submit" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">Generate Short URL</button>
              <button type="submit" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">Generate QRCODE</button>
            </div>
          </form>
          <p v-if="shortURL" class="mt-4 bg-green-100 px-4 py-2 rounded-lg">
            <strong>Short URL:</strong> <a :href="'http://localhost:3000/' + shortURL" class="text-green-600">{{ shortURL }}</a>
          </p>
        </div>
      </div>
      <div class="bg-blue-500 min-h-screen py-10">
        <div class="container mx-auto">
          <h1 class="text-center text-3xl font-bold text-white mb-6">History</h1>
          <div class="mt-5 bg-white p-6 ml-1 rounded-lg shadow-lg">
            <form @submit.prevent="fetchdata">
              <div class="flex justify-center">
                <button type="submit" class="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg mb-5">History Short URL</button>
              </div>
            </form>
            <table class="table border-collapse w-full">
              <thead>
                <tr class="bg-gray-300">
                  <th class="py-2 px-4">Original URL</th>
                  <th class="py-2 px-4">Short URL</th>
                  <th class="py-2 px-4">Click Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="url in urls" :key="url.id" class="border-b">
                  <td class="py-2 px-4">{{ url.originalURL }}</td>
                  <td class="py-2 px-4">
                    <a :href="'http://localhost:3000/' + url.shortURL" class="text-blue-500 hover:underline pl-4 md:pl-16">{{ url.shortURL }}</a>
                  </td>
                  <td class="py-2 px-4 pl-4 md:pl-20">{{ url.clickCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <style scoped>


   .box{
    width: 1550px;
   }
  
  </style>
  
  <script>

  export default {
    el: '#app',
    data() {
      return {
        originalURL: "",
        shortURL: "",
        urls: [],
      };
    },
    methods: {
      async generateShortURL() {
        // Call the backend API to generate a short URL
        const response = await fetch("http://localhost:3000/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalURL: this.originalURL }),
        });
        const data = await response.json();
        this.shortURL = data.shortURL;
      },
      
    
    async fetchdata(){
  try {
    const response = await fetch('http://localhost:3000/api/short'); // เปลี่ยน '/api/data' เป็น URL ของ API ของคุณ
    // http://localhost:3000/OZ8Y42g8o
    if (!response.ok) {
      throw new Error('ไม่สามารถเรียกข้อมูลได้');
    }

    this.urls = await response.json();
    // console.log('ข้อมูลที่ได้:',urls);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  }
}
    
}
  }
  </script>
  

