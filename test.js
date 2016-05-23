function getLastName(name) { //Returns last name as array. Have to account for hyphenated first/last names and suffixes (Jr, III)
				var nonName = /Jr.|III|\'/g; //Regex that matches Jr. or III as well as apostrophes
				name = name.replace(nonName, "").trim(); //Replace undesirable suffixes, etc.
				console.log(name);
				var array = name.split(" ");
				array.splice(0, 1);
				console.log(array);
				array = array[array.length-1].split(/-/); 
				console.log(array);
				var lastName = array[0];
				for(var i = 1; i < array.length; i++) { //Assemble name string
					lastName+= " " + array[i];
				}
				return lastName;
			}


// var a = [ 'Towns-Davis'];
// var d = [ 'Anthony'];
// var b = a[0].split(/-/);
// var c = d[0].split(/-/);
// if (c) {
// 	console.log("c");
// } 
// console.log(b);
console.log(getLastName("Karl-Anthony Towns"));
console.log(getLastName("James Michael McAdoo"));

console.log(getLastName("Karl-Anthony To'wns-Davis Jr. III"));
console.log(getLastName("Michael Carter-Williams"));