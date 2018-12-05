const express = require('express');

const CLIENT_ID = "0df95667a0b1134583e6382f3f9a1fba42709a77";
const CLIENT_SECRET = "QC+zg7JwONI9Y9ER1Q51do8h+mqJWE8a2skz7iWNZ+FPUUpdSk/dGKG4unjgvhRhDlklyiz3ytA9M8vIz3Z2ySNhAfPn24E5vmfBx2iZQFhi2ikQM99slNvtHAo4f57r"
const ACCESS_TOKEN = "302b4f3f993c4abc65bed61b3d1336a4";


const app = express();

  app.use(express.static('../build'));

app.get('/', (req,res)=> {

  res.sendFile('index.html');
});

app.get('/videos', (req, res) => {
    const Vimeo = require('vimeo').Vimeo;
    const client = new Vimeo(CLIENT_ID, CLIENT_SECRET,);

    client.request({
       method: "GET",
       path: '/users/user88363504/videos?',
    },function (error, body, status_code, headers) {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log('body');
        console.log(body);
      }

      // console.log('status code');
      console.log("test: ", body.data);
      res.json(body.data);
      // console.log('headers');
      // console.log(headers);
    });
});

app.listen(5000);
