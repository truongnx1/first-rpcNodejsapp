var mongoose = require('mongoose'),
Block_Count = mongoose.model('BlockCount');
const request = require('request');
let username = process.argv.length < 2 ? "default-username" : process.argv[2];
let password = process.argv.length < 3 ? "default-password" : process.argv[3];
let BlockCount;
let GetBlocksBusy = false;
let GetBlockHashBusy = false;
let BlockInfo;
let blocks=[];
let checkBlockCountChange=true;

setInterval(blockCount, 1000);
exports.get_block_hashs = function(){
	getBlockCount();

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
	id=BlockCount._id;
	Block_Count.findByIdAndUpdate(id,{_count: count});
}
function blockCount(){
	Block_Count.find(function (err, count) {
	  	if (err) return console.error(err);
	  	BlockCount=count[0];
	  	console.log(BlockCount);	
	});
}
function getBlockCount() {
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
					console.log('Block count:',count);
					getBlockHashs();
				} catch(err) {
				  console.error(err)
				}				
			}
	});
};


function getBlockHashs(){
	console.log("Start get block hash");
	for(var i=0;i<count;i++){
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
				 	hashes.push(hash.result);	
					console.log('hashes: ',JSON.parse(body).result);
					console.log("Got result", hashes.length);
					checkForFinishing(count, hashes);
					getBlocks(hash.result);
				} catch(err) {
			  		console.error(err)
				}
				
			}
	});
	}
}
//setInterval(callback, repeat, arg1, arg2, arg3);
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
  				  const blockhash = JSON.parse(body)
				  console.log(blockhash);
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