var mongodb = require('../models/todoListModel.js'),
Block_Count = mongoose.model('BlockCount');
//Block = mongoose.model('Block');
const request = require('request');
let username = process.argv.length < 2 ? "default-username" : process.argv[2];
let password = process.argv.length < 3 ? "default-password" : process.argv[3];
let BlockCount;
let GetBlocksBusy = false;
let GetBlockHashBusy = false;
let BlockInfo;
let blocks=[];


setInterval(getBlockCount, 5000);
exports.get_block_hashs = function(){
	saveBlockCount(3);

	// Block_Count.create({_count:0}, function (err, small) {
 //  		if (err) return handleError(err);
	// });
	// saveBlockCount(3);
	// Block_Count.deleteMany({_count:0},function (err, count) {
 //  		if (err) return console.error(err);
 //  		Block_Count.remove(count);
	// });
	//set();
	//blockCount();

	// save(3,blockCount);

}	

// function save(count,callback){
// 	BlockCount._count=count;
// 	Block_Count.findByIdAndUpdate(BlockCount.id,{$set:{BlockCount}}, function(err, result){
// 		    if(err){
// 		        console.log(err);
// 		    }
// 		  	console.log(BlockCount);
// 	});
// }

function saveBlockCount(count){
	id=BlockCount.id;
	Block_Count.findByIdAndUpdate(id,{_count: count},{new:true},function(err,doc){
		if(err)
			console.log(err);
	});
}

function blockCount(){
	Block_Count.find(function (err, count) {
	  	if (err) return console.error(err);	
	  	// if(checkBlockCountChange) return;
  		BlockCount=count[0];
  		console.log("blockCount: ",BlockCount._count);
	});
}
function getBlockCount() {
	blockCount();
	console.log("Start get block count");
	let options = {
		url: "http://localhost:51475",
		method: "post",
		headers:
		{ 
		 "content-type": "text/plain"
		},
		auth: {
				user: "truong",
				pass: "1"
		},
		body: JSON.stringify({"jsonrpc": "2.0", "id": "curltest", "method": "getblockcount" })
	};
	request(options, (error, response, body) => {
			if (error) {
			} else {
				try {
					console.log("End get block count.");
					count = (JSON.parse(body)).result;
					console.log('count:',count);
					console.log("BlockCOUNT: ",BlockCount._count);
					if(BlockCount._count !=count){
						getBlockHashs();
						saveBlockCount(count);
					}
				} catch(err) {
				  console.error(err)
				}				
			}
	});
};


function getBlockHashs(){
	console.log("Start get block hash");
	for(i=count;i>BlockCount._count;i--){
		console.log("Start getting block", i);
		let options = {
			url: "http://localhost:51475",
			method: "post",
			headers:
			{ 
				"content-type": "text/plain"
			},
			auth: {
				user: "truong",
				pass: "1"
			},
			body: JSON.stringify({"jsonrpc": "2.0", "id": "curltest", "method": "getblockhash","params":[i] })
		};

		request(options, (error, response, body) => {
			if (error) {
			} else {
				try {
				 	const hash = JSON.parse(body)
				 // 	hashes.push(hash.result);	
					// console.log('hashes: ',JSON.parse(body).result);
					// console.log("Got result", hashes.length);
					//checkForFinishing(count, hashes);
					getBlocks(hash.result);
				} catch(err) {
			  		console.error(err)
				}
				
			}
		});
	}
	checkBlockCountChange=false;
}

function getBlocks(hash){
		let options = {
			url: "http://localhost:51475",
			method: "post",
			headers:
			{ 
				"content-type": "text/plain"
			},
			auth: {	
				user: "truong",
				pass: "1"
			},
			body: JSON.stringify({"jsonrpc": "2.0", "id": "curltest", "method": "getblock","params":[hash]})
		};


		request(options, (error, response, body) => {
			if (error) {
				console.log("getblocks err");
			} else {
				try {
  				  const block = JSON.parse(body)
  				  blocks.push(block.result);
				  console.log(block.result);
				} catch(err) {
				  console.error("err:  ",hash)
				  return;
				}
				
			}
		});
	}

function checkForFinishing(count, hashes) {
	if (hashes.length == count) {
		console.log("Done");
		getTransactions();
	} else {
		console.log("continue...");
	}
}

function getTransactions() {
	//console.log(hashes);
}
	


exports.create_a_task = function(req, res) {
	var new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	}); 
};


exports.read_a_task = function(req, res) {
	Task.findById(req.params.taskId, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};


exports.update_a_task = function(req, res) {
	Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};


exports.delete_a_task = function(req, res) {


	Task.remove({
		_id: req.params.taskId
	}, function(err, task) {
		if (err)
			res.send(err);
		res.json({ message: 'Task successfully deleted' });
	});
}