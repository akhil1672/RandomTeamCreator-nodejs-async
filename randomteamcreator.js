const fs=require('fs');
const prompt = require('prompt');
const shuffle= require('shuffle-array');
prompt.start();
let teamSize = prompt.get(['FilePath','TeamSize'],function(err,result){
    fs.readFile(result.FilePath,function(err,data){
        let json=JSON.parse(data);
        json=shuffle(json);
        let size = result.TeamSize;
        if (size < 1) {
            console.log("Size cannot be 0 or negative or " + err);
            process.exit(1);
        }
        let jsonlength = json.length;
        console.log("No of students:" + jsonlength);
        if (size > jsonlength) {
            console.log("Size cannot be greater than no of students" + err);
            process.exit(1);
        }
        var noofteams = Math.ceil(jsonlength / size);
        if (isNaN(noofteams)) {
            console.log("Invalid entry!");
            process.exit(1);
        }
        console.log("No of teams:" + noofteams);
        var extra = jsonlength % size;
        if (extra != 0) {
            console.log("Unequal teams! Continue(Y/N):");
            prompt.get(['Enter'], function (err, result) {
                var input = result.Enter;
                if (input == "Y" || input == 'y') {
                    console.log("Unequal teams!");
                    createteams(json,jsonlength,size);
                }
                else if (input == "N" || input == 'n') {
                    console.log("Have a good day!")
                }
                else
                    console.log(err);
            })
        }
        else {
            console.log("Equal teams");
		createteams(json,jsonlength,size);
        }  
    })
})

function createteams(json,jsonlength,size)
{
let j = 1, k = 0;
            console.log("CREATING TEAMS!");
            console.log("Team " + j);
            let ws = fs.createWriteStream("teams.txt");
            ws.write("Team " + j + "\r\n");
            for (let i = 0; i < jsonlength; i++ , k++) 
		{
                if (k >= size) 
		{
                    j++;
                     console.log("Team " + j);
                    ws.write("Team " + j + "\r\n");
                    k = 0;
                }
                console.log(json[i].name);
                ws.write(json[i].name + "\r\n");
            }
            ws.on('finish', () => {
                console.log('wrote all data to file');
            });
            ws.end();
}
