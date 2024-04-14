import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/random", (req,res) => {
    var subjectCounts = Math.floor(Math.random() * subjects.length);
    //convert the JS Object to JSON output
    res.json(subjects[subjectCounts]);
});

app.get("/random/:id", (req, res) => {
    //:id is a path parameter so to access it you need to use re.params.id
    var id = parseInt(req.params.id);//convert it first to integer
    //find the subject from your subjects array list using FIND method
    //array.find(expect a callback). "subject" is a variable you create
    var subjectFound = subjects.find((subject) => subject.id === id);
    res.json(subjectFound);
});

app.get("/filter", (req, res) => {
    var searchSubject = req.query.complexity;
    var subjectFilter = subjects.filter((subject) => subject.complexity == searchSubject);
    res.json(subjectFilter);
});

app.post("/subjects", (req, res) => {
    const newSubjects = {
        id: subjects.length + 1,
        subject: req.body.subject,
        enrolled: req.body.enrolled,
        complexity : req.body.complexity
    };
    subjects.push(newSubjects);
    res.json(newSubjects);
});

app.put("/random/:id", (req, res) => {
    var id = parseInt(req.params.id);
    const putUpdateSubjects = {
        id: id,
        subject: req.body.subject,
        enrolled: req.body.enrolled,
        complexity : req.body.complexity
    };
    //searching for the subject that need to update, if the id matches, it will ouput the index
    //of the subjects
    const searchIndexofSubject = subjects.findIndex((subject) => subject.id === id);
    //then use the index ID to locate the subject/ tap into it and set it or equal it
    //to the NEW subjects
    subjects[searchIndexofSubject] = putUpdateSubjects;   
    res.json(putUpdateSubjects);
});

app.patch("/random/:id", (req, res) => {
    var id = parseInt(req.params.id);
    const searchSubject = subjects.find((subject) => subject.id === id);
    //below is to check if the subject being passed from the body if has data or not
    //if has data, "req.body.subject" will be executed to update or patch
    //if no data being passed, "searchSubject.subject" will executed - so no changes on the data
    const patchUpdateSubjects = {
        id: id,
        subject: req.body.subject || searchSubject.subject,
        enrolled: req.body.enrolled || searchSubject.enrolled,
        complexity : req.body.complexity || searchSubject.complexity
    };
    const searchIndexofSubject = subjects.findIndex((subject) => subject.id === id);
    //then use the index ID to locate the subject/ tap into it and set it or equal it
    //to the NEW subjects
    subjects[searchIndexofSubject] = patchUpdateSubjects;   
    res.json(patchUpdateSubjects);
});

const yourToken = "8e8af022-c083-4ed6-aff1-3a8ae12deb96";
app.delete("/delete/:id", (req, res) => {
    var id = parseInt(req.params.id);
    const searchIndexofSubject = subjects.findIndex((subject) => subject.id === id);
    if (searchIndexofSubject > -1 && req.query.userkey === yourToken) {
        //takes the index you found and "1" indicates that you are removing 1 id.
        subjects.splice(searchIndexofSubject, 1);
        res.json("Deleted.");
    } else {
        res.json({error: "An error occured"});
    }
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

var subjects = [
    { 
        id: 1,
        subject: "Mathematics",
        enrolled: 2,
        complexity : "Hard"
    },
    { 
        id: 2,
        subject: "Science",
        enrolled: 5,
        complexity : "Hard"
    },
    { 
        id: 3,
        subject: "English",
        enrolled: 7,
        complexity : "Medium"
    },
    { 
        id: 4,
        subject: "Filipino",
        enrolled: 9,
        complexity : "Medium"
    },
    { 
        id: 5,
        subject: "Mapeh",
        enrolled: 3,
        complexity : "Easy"
    },
    { 
        id: 6,
        subject: "Araling Panlipunan",
        enrolled: 15,
        complexity : "Easy"
    }
]