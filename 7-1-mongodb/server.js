import mongoose from "mongoose";

// Mongoose TODO-1: Establish connection with MongoDB.
const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://HasanDB:<db_password>@cluster0.rygtjue.mongodb.net/TestDB";

if (!process.env.MONGODB_URI) {
  console.log(
    'Set the "MONGODB_URI" environment variable before running this file.'
  );
  console.log(
    "Example: mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/TestDB"
  );
}

// Mongoose TODO-2: Define the schema.
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});

// Mongoose TODO-2: Create the Student model from the schema.
const Student = mongoose.model("Student", studentSchema);

// Mongoose TODO-3: Create documents for Ali and Sara.
async function createStudents() {
  await Student.deleteMany({ name: { $in: ["Ali", "Sara"] } });
  await Student.insertMany([
    { name: "Ali", age: 21, major: "CS" },
    { name: "Sara", age: 23, major: "SE" },
  ]);
  console.log("Inserted students");
}


// Mongoose TODO-4: Read all student documents.
async function readStudents() {
  const all = await Student.find();
  console.log(all);
}

// Mongoose TODO-5: Update Ali's age to 22.
async function updateStudent() {
  await Student.updateOne({ name: "Ali" }, { $set: { age: 22 } });
  console.log("Updated Ali");
}

// Mongoose TODO-6: Delete Sara's document.
async function deleteStudent() {
  await Student.deleteOne({ name: "Sara" });
  console.log("Deleted Sara");
}

async function main() {
  if (!process.env.MONGODB_URI) {
    return;
  }

  // Mongoose TODO-1: Open the database connection.
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  // Run the Mongoose TODOs in order.
  await createStudents();
  await readStudents();
  await updateStudent();
  await deleteStudent();
  await readStudents();

  await mongoose.connection.close();
  console.log("Connection closed");
}

main().catch(async (error) => {
  console.error("MongoDB task failed:", error.message);

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  process.exitCode = 1;
});
