import http, { validateHeaderValue } from 'http'

const port = 300;

const server = http.createServer((req, res) => {

    
    if (req.url === '/myself') {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain");
        res.write("My team name is AST team\n")
        res.write("what are you doing\n")
        res.write("G.Haritha pushpa")
        res.write("9618390632")
        res.write("harithagoluguri26@gmail.com")
        res.write("SKILLS-")
        res.write("Problem-Solving skills \n critical Thinking Skills\n Flexibility Communication Skills Teamwork Organization Skills Creativity")
        res.write(" Critical Thinking Skills")
        res.write(" Flexibility")
        res.write("Communication skills")
        res.write("Team work")
        res.write("Organization skills")
        res.write("Creativity")

        res.write("")
        res.write("")
        res.write("")
        res.write("")
        res.write("")
        res.write("")
        res.write("")
        res.write("")

        
        res.end()
     }
     else if (req.url === '/html') {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html");
        res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="STYLESHEET" href="sytle.css"/>
                <style>
                    body{
                font-style: oblique;
                background-color: rgb(200, 247, 247);
                font-family:'Times New Roman', Times, serif;
            }
            /* .image{
                width:100%;
                height:100vh;
                display:flex;
                align-items:center;
                background-color:Hex #F7CAC9;
                justify-content:center;
            } */
            .img{
                border-radius:50%;
            }
            section{
                font-style:calc(30px);
                font-family: Arial, Helvetica, sans-serif;
                background-color: rgb(173, 201, 238);
                padding:30px;
                box-shadow: rgb(43,19,19);
                border-radius: 10px;
                margin:10px;
            }
            table{
                width:90%;
            }
            tr{
                font-family: Arial, Helvetica, sans-serif;
                font-weight:100px;
                background-color:rgb(235, 210, 240);
                padding:15px;
            }
            th{
                font-family: Arial, Helvetica, sans-serif;
                background-color:rgb(199, 173, 229);
                color:white;
                padding:15px;
            }
            tr{
                font-style: inherit;
                font-family: Arial, Helvetica, sans-serif;
                padding:15px;
            }
            label{
                font-style: italic;
                font-weight:bold;
                margin-top:30px;
            }
            input{
                font-style: inherit;
                padding:10px;
                margin-top: 5px;
                margin-bottom: 10px;
                border-radius: 5px;
                border:1px solid #ccc;
            
            }
            submit{
                font-style: var(5px);
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                background-color:rgb(185, 179, 171);
                color:white;
                padding:30px;
                border-radius:5px;
                cursor:pointer;
            }
                </style>
            </head>
            <body>
                <section>
                    
                    <div class="image"><img src="hari.jpg"/>
            
                    </div>
                     <h2>G.Haritha pushpa</h2>
                     <h3>9618390632</h3>
                     <h3>harithagoluguri26@gmail.com</h3>
                     
             
                 </section>
                 <section>
                     <h3>SKILLS-</h3>
                     <ol>
                        Problem-Solving Skills
                        Critical Thinking Skills
                        Flexibility
                        Communication Skills
                        Teamwork
                        Organization Skills
                        Creativity
                     </ol>
                 </section>
                 <section>
                     <h3>HOBBIES-</h3>
                      <ul>
                         <li>Volunteering</li>
                         <li>Photography</li>
                         <li>Painting</li>
                         <li>Sports</li>
                         <li>Dancing</li>
                      </ul>
                      </section>
                      <section>
                      <h3>STRENGHTS-</h3>
                      <ol>
                        <li> Disciplined</li>
                        <li>Fast Learner </li>
                        <li>Dedicated</li>
                        <li> Versatile</li>
                         <li> Honest</li>
                        </ol>
                    </section>
                    <section>
                     <h3>WEAKNESS-</h3>
                     <ul>
                        <li>I have trouble saying no</li>
                        <li>Difficulty asking for help</li>
                        <li>Extremely Introverted</li>
                        <li>Delegating tasks</li>
            
                     </ul>
                </section>
                <section>
                    <h3>EDUCATION</h3>
                    
                    <div class="education section">
                        <h2 class="section-title">Education</h2>
                        <div class="section-content">
                            <div class="education-item">
                                <h3>Example University</h3>
                                <p>Bachelor of Science in Information Technology, 2025</p>
                                <p>GPA: 3.9/4.0</p>
                            </div>
                        </div>
                    </div>
            
                   
                </section>
                <section>
                    <h3>CONTACT FORM</h3>
                    <form>
                        <label for="name">name:</label>
                        <input id="message"></input><br>
                        <label for="  mail">mail:</label>
                        <input id="message"></input><br>
                        <label for="message">message:</label>
                        <input id="message"></input><br>
                        <input type="submit">
                    </form>
                </section>
            
            
            
            </body>
            </html>`)
        }
            else if (req.url === '/senddata') {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json");
                const resume= {
                    "profile": {
                      "name": "G.Haritha pushpa",
                      "phone": "9618390632",
                      "email": "harithagoluguri26@gmail.com"
                    },
                    "skills": [
                      "Problem-Solving Skills",
                      "Critical Thinking Skills",
                      "Flexibility",
                      "Communication Skills",
                      "Teamwork",
                      "Organization Skills",
                      "Creativity"
                    ],
                    "hobbies": [
                      "Volunteering",
                      "Photography",
                      "Painting",
                      "Sports",
                      "Dancing"
                    ],
                    "strengths": [
                      "Disciplined",
                      "Fast Learner",
                      "Dedicated",
                      "Versatile",
                      "Honest"
                    ],
                    "weaknesses": [
                      "I have trouble saying no",
                      "Difficulty asking for help",
                      "Extremely Introverted",
                      "Delegating tasks"
                    ],
                    "education": [
                      {
                        "institution": "Example University",
                        "degree": "Bachelor of Science in Information Technology",
                        "year": "2025",
                        "gpa": "3.9/4.0"
                      }
                    ],
                    "contact_form": {
                      "name": "message",
                      "mail": "message",
                      "message": "message"
                    }
                  }
                  res.end(JSON.stringify(resume))
                   }
                   else{
                    res.statusCode = 400
                    res.end("page not found");
                   }
            });
server.listen(port, () => {
    console.log(`Server running at ${port}`);
});
