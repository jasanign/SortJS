/*
 * This program reads the contact information from any given text, 
 * sorts them by last names and writes the sorted output to 
 * another text file.
 
 * @author  - Gajjan Jasani
 * @version - 19 April 2016
*/

/* module for file read/write */
var fs = require("fs");

/*
 *  Function: main
 *  Use: The entry point to this program. This function 
 *  makes sure the number os arguments provided matches the 
 *  program requirements, calls low level functions to read from 
 *  contacts from file, sort them and write the sorted contacts to 
 *  another file
 */
function main(){
	// check that the user inputs all for arguments necessary for the program to run
	if(process.argv.length !== 4){
		console.log();
		console.log("Usage format: <node.js> <struct-sort.js>"+
											" <input_file path> <output_file path>");
		console.log();
		process.exit();
	}
	// Making sure inputfile is not empty
	var data = fs.readFileSync(process.argv[2], "utf8");
	if (data.trim() === "") {
		console.log();
        console.log("Input can not be empty or only be whitespace.");
		console.log();
		process.exit();
    }
	// getting the strings from each line of file
	var textArray = data.split("\n");
	var contacts = [];
	var k = 0;
	// ignoring the blank lines in input file
	for( var i = 0; i < textArray.length; i++){
		if(textArray[i][i] == null){
			continue;
		}
		//breaking line at each coma for separiting fields
		contacts[k] = textArray[i].split(",");
		for (var j = 0; j < contacts[k].length; j++){
			contacts[k][j] = contacts[k][j].trim();
		}
		k++; // taking the line as input only if it is not blank
	}
	// calling the sort function to sort the contacts
	sort(contacts);
	// calling concatinateData function to reform the text from arrays of fields
	data = concatinateData(contacts);
	// Writing the reformed text to output file
	fs.writeFileSync(process.argv[3], data);
	console.log();
	console.log("done");
	console.log();
}

/*
*	 Function: sort
 *  Use: Sort the contacts using the last name of the 
 *  contacts ignoring the case. If the last name are the same
 *  then compare the first name
 *  Args : contacts : array of broken down contacts
*/
function sort(contacts){
	
	var lastNameIndex = 1;	// for comparing last names
	var firstNameIndex = 0; 	// for comparing first names
	// basic string compare & swap algorithm for sorting
	for (var i = 0; i < contacts.length; i++){
		for(var j = 0; j < contacts.length-1; j++){
			//Ignoring the case sensitivity
			var str1 = contacts[j][lastNameIndex].toUpperCase();
			var str2 = contacts[j+1][lastNameIndex].toUpperCase();
			var n = str1.localeCompare(str2);
			// comparing last names
			if(n > 0){
				var temp = contacts[j];
				contacts[j] = contacts[j+1];
				contacts[j+1] = temp;
			} else if(n === 0){ // if lastnames are same, compare first names
				var str1 = contacts[j][firstNameIndex].toUpperCase();
				var str2 = contacts[j+1][firstNameIndex].toUpperCase();
				var n = str1.localeCompare(str2);
				
				if(n > 0){
					var temp = contacts[j];
					contacts[j] = contacts[j+1];
					contacts[j+1] = temp;
				}
			}
		}
	}
}

/*
 * Function: concatinateData
 *  Use: Takes the sorted broken down contacts as input and reforms the text
 *  Args : contacts : array of sorted broken down contacts
 * return: data - reformed texts
 *
 */
function concatinateData(contacts){
	
	var data = '';
	for (var i = 0; i < contacts.length; i++){
		for (var j = 0; j < contacts[i].length; j++){
			if( j > 0){
				data = data +', '+ contacts[i][j];
			} else {
				data = data+contacts[i][j];
			}
		}
		data = data + '\n';
	}
	return data;
}
// Call to the main function to begin execution of the program
main();
