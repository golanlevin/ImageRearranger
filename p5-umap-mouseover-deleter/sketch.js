// Simple visualization tool for 
// inspecting and editing UMAP/t-SNE mosaics
//
// Click to toggle a cell into the 'badList'
// Press 's' to export the 'badList' JSON
// Press ' ' to clear the 'badList'
// Here's an example of a badList.json file: 
/* 

[
  { "filename": "kress_00243.png", "row": 3, "col": 7 },
  { "filename": "kress_00652.png", "row": 5, "col": 7 },
  { "filename": "kress_00331.png", "row": 5, "col": 8 }
]

*/

// Here is a shell script to delete images 
// that are listed in the badList.json. 
// You'll need to install the jq JSON parser with
// `brew install jq` (Mac) 
// Save this to `delete_bad_files.sh`, then
// `chmod +x delete_bad_files.sh` to make it executable, 
// `./delete_bad_files.sh` to run the script. 
/*

#!/bin/bash
# Extract filenames from badList.json and delete them
jq -r '.[].filename' badList.json | while read -r file; do
    if [[ -f "$file" ]]; then
        rm "$file"
        echo "Deleted: $file"
    else
        echo "File not found: $file"
    fi
done

*/

// To use your own data, replace 
// final_mosaic.jpg and grid_positions.json
// in the "Sketch Files" tab at left. 


let img;
let positions;
let nx, ny;
let cellSize;
let badList = [];

//-----------------------------
function preload() {
  // Load files generated by the Python notebooks. 
  // You can find these in the 'output' folder. 
  // You may need to convert your mosaic to .jpg if
  // you hit a filesize limit uploading a large .png
  img = loadImage("final_mosaic.jpg");
  positions = loadJSON("grid_positions.json");
}

//-----------------------------
function setup() {
  createCanvas(img.width, img.height);
  nx = positions.grid_size.nx;
  ny = positions.grid_size.ny;
  cellSize = img.width / nx;
}

//-----------------------------
function draw() {
  background(0);
  image(img, 0, 0);
  drawBadList(); 

  let pos = getPositionFromPixel(mouseX, mouseY); 
  let filename = findFileByPosition(positions.positions, pos.x, pos.y);
  displayFilenameAtPixel(filename, mouseX, mouseY);
  
}

//-----------------------------
function mousePressed() {
  let pos = getPositionFromPixel(mouseX, mouseY);
  let filename = findFileByPosition(positions.positions, pos.x, pos.y);
  
  if (filename) {
    let entry = { filename: filename, row: pos.y, col: pos.x };

    // Check if the entry already exists in badList
    let index = badList.findIndex(item => 
      item.filename === filename && item.row === pos.y && item.col === pos.x
    );

    if (index === -1) {
      // If not found, add it
      badList.push(entry);
    } else {
      // If found, remove it
      badList.splice(index, 1);
    }
  }
}

//-----------------------------
function keyPressed(){
  if (key == ' '){
    badList = [];
    
  } else if (key == 's'){
    if (badList.length > 0) {
      saveJSON(badList, 'badList.json');
    } else {
      console.log("badList is empty. No file saved.");
    }
  }
}

//-----------------------------
function drawBadList(){
  for (let i=0; i<badList.length; i++){
    let pos = badList[i]; 
    let px = pos.col * cellSize; 
    let py = pos.row * cellSize; 
    strokeWeight(2);
    stroke('red'); 
    fill(255,0,0, 128); 
    rect(px, py, cellSize,cellSize); 
    strokeWeight(1);
  }
}

//-----------------------------
function displayFilenameAtPixel(filename, px, py){
  if (!filename){ filename = "null"; }
  push(); 
  let tx = (px < (width-120)) ? px : px-120; 
  let ty = (py >  64) ? py-60 : py+60;
  translate(tx, ty); 
  noStroke();
  fill(0); 
  rect(0,0, 120,30); 
  fill(255);
  text(filename, 12,18); 
  pop(); 
}

//-----------------------------
function getPositionFromPixel(px, py){
  let qx = int(px / cellSize);
  let qy = int(py / cellSize);
  qx = constrain(qx, 0, nx - 1);
  qy = constrain(qy, 0, ny - 1);
  return createVector(qx,qy); 
}

//-----------------------------
function findFileByPosition(positions, c, r) {
  for (const [filename, pos] of Object.entries(positions)) {
    if (pos.col === c && pos.row === r) {
      return filename; // Return the first matching filename
    }
  }
  return null; // Return null if no match is found
}
