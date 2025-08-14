const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect("mongodb+srv://Pinkan2004:Pinkan%400980@cluster0.lshniqm.mongodb.net/crud")
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create a student schema
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// Create student model
const StudentModel = mongoose.model("student", StudentSchema);

app.use(express.urlencoded({ extended: false }));

// Api to insert a new student
app.post("/createStudent", async (req, res) => {
  try {
    const student = await StudentModel.create(req.body);
    return res.json("Student Inserted Successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong");
  }
});


app.get('/fetchStudent', async (req, res) => {
    const student = await StudentModel.find();
    return res.json(student);
})


// Edit student details
app.put('/updateStudent/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const student = await StudentModel.findByIdAndUpdate(id, {
    name: body.name,
    email: body.email,
    age: body.age,
    phone: body.phone,
    gender: body.gender,
  })
  if (student) {
    res.json({message: 'User Updated Successfully'});
  } else {
    res.json({message: 'Something Went Wrong'});
  }
})



// Delete a student
app.delete('/deleteUser/:id', async (req, res) => {
  const id = req.params.id;
  const student = await StudentModel.findByIdAndDelete(id);
  if (student) {
    res.json({message: 'User Deleted Successfully'});
  } else {
    res.json({message: 'Something Went Wrong'});
  }
})




app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});