// import { Command } from "commander";
// import inquirer from "inquirer";
// import fs from "fs";

// const program = new Command(); //Create a new command-line program

// // program
// //   .name("create cli app") //Set the name of the program
// //   .description("A simple CLI to create a project") //Set the description of the program
// //   .version("1.0.0"); //Set the version of the program

// // program
// //   .command("add") //Define a command named 'add' | in terminal we will write: node index.js add --price 100
// //   .alias("a") //use add or a
// //   .description("Add a new course") //Set the description of the command add
// //   .argument("<title>", "add a new course title") //Define an argument for the command add | means <title> => value
// //   .option("--price <price>", "Course price") //Define an option for the command add
// //   .action((title, options) => {
// //     console.log(`Creating course: ${title}`);
// //     if (options.price) {
// //       console.log(`Course price: ${options.price}`);
// //     }
// //   });

// // program
// //   .command("list")
// //   .alias("l")
// //   .description("list courses") //Set the description of the command add
// //   .action(() => {
// //     console.log(`Listing courses:`);
// //   });

// // program.parse(process.argv); //Parse the command-line arguments // process means el brnamg eli shgal dlw // argv means arguments eli gayah mn el terminal

// const filePath = "./course.json";
// const questions = [
//   /* Pass your questions in here */
//   // type: (String) Type of the prompt. Defaults: input - Possible values: input, number, confirm, list, rawlist, expand, checkbox, password, editor
//   {
//     type: "input",
//     name: "title",
//     message: "please enter course title",
//   },
//   {
//     type: "number",
//     name: "price",
//     message: "please enter course price",
//   },
// ];
// program
//   .name("create cli app") //Set the name of the program
//   .description("A simple CLI to create a project") //Set the description of the program
//   .version("1.0.0"); //Set the version of the program

// program
//   .command("add") //Define a command named 'add' | in terminal we will write: node index.js add --price 100
//   .alias("a") //use add or a
//   .description("Add a new course") //Set the description of the command add
//   .action(() => {
//     inquirer.prompt(questions).then((answers) => {
//       console.log(answers);
//       //law elfile mwgod // feh dataa
//       if (fs.existsSync(filePath)) {
//         fs.readFile(filePath, "utf8", (err, filContent) => {
//           if (err) {
//             console.log(err);
//             process.exit(); // a5rog mn el process eli bt3mlha dlw
//           }
//           console.log("fileContent", filContent);

//           const fileContentAsJson = JSON.parse(filContent);
//           fileContentAsJson.push(answers); // add el new values

//           fs.writeFile(
//             filePath,
//             JSON.stringify(fileContentAsJson),
//             "utf8",
//             (err) => {
//               if (err) throw err;
//               console.log("Course added successfully!");
//             }
//           );
//         });
//       } else {
//         fs.writeFile(filePath, JSON.stringify([answers]), (err) => {
//           if (err) throw err;
//           console.log("Course added successfully!");
//         });
//       }
//     });
//   });

// program
//   .command("list")
//   .alias("l")
//   .description("list courses") //Set the description of the command add
//   .action(() => {
//     fs.readFile(filePath, "utf8", (err, filContent) => {
//       if (err) {
//         console.log(err);
//         process.exit();
//       }
//       console.table(JSON.parse(filContent));
//     });
//   });

// program.parse(process.argv); //Parse the command-line arguments // process means el brnamg eli shgal dlw // argv means arguments eli gayah mn el terminal
