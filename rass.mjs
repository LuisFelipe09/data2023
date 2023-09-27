import ethers from "ethers";
import 'dotenv/config'

const contractInstance = '0x88a2C047C1914D765AB70E9551e90A52D21967E5'
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "errorCode",
          "type": "int256"
        }
      ],
      "name": "ActorError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailToCallActor",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "name": "InvalidCodec",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidResponseLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "NotEnoughBalance",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint64",
          "name": "dealId",
          "type": "uint64"
        }
      ],
      "name": "CompleteAggregatorRequest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "cid",
          "type": "bytes"
        }
      ],
      "name": "SubmitAggregatorRequest",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "_dealId",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "_minerId",
          "type": "uint64"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofSubtree",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofIndex",
              "type": "tuple"
            }
          ],
          "internalType": "struct InclusionProof",
          "name": "_proof",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPc",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePc",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionVerifierData",
          "name": "_verifierData",
          "type": "tuple"
        }
      ],
      "name": "complete",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPa",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePa",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionAuxData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "commDs",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "offset",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "size",
              "type": "uint64"
            },
            {
              "internalType": "bytes16",
              "name": "checksum",
              "type": "bytes16"
            }
          ],
          "internalType": "struct SegmentDesc",
          "name": "_sd",
          "type": "tuple"
        }
      ],
      "name": "computeChecksum",
      "outputs": [
        {
          "internalType": "bytes16",
          "name": "",
          "type": "bytes16"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofSubtree",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofIndex",
              "type": "tuple"
            }
          ],
          "internalType": "struct InclusionProof",
          "name": "ip",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPc",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePc",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionVerifierData",
          "name": "verifierData",
          "type": "tuple"
        }
      ],
      "name": "computeExpectedAuxData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPa",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePa",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionAuxData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "dealId",
          "type": "uint64"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofSubtree",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint64",
                  "name": "index",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "path",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ProofData",
              "name": "proofIndex",
              "type": "tuple"
            }
          ],
          "internalType": "struct InclusionProof",
          "name": "ip",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPc",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePc",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionVerifierData",
          "name": "verifierData",
          "type": "tuple"
        }
      ],
      "name": "computeExpectedAuxDataWithDeal",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "commPa",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "sizePa",
              "type": "uint64"
            }
          ],
          "internalType": "struct InclusionAuxData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "left",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "right",
          "type": "bytes32"
        }
      ],
      "name": "computeNode",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "index",
              "type": "uint64"
            },
            {
              "internalType": "bytes32[]",
              "name": "path",
              "type": "bytes32[]"
            }
          ],
          "internalType": "struct ProofData",
          "name": "d",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "subtree",
          "type": "bytes32"
        }
      ],
      "name": "computeRoot",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_cid",
          "type": "bytes"
        }
      ],
      "name": "getActiveDeals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "dealId",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "minerId",
              "type": "uint64"
            }
          ],
          "internalType": "struct IAggregatorOracle.Deal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCIDs",
      "outputs": [
        {
          "internalType": "bytes[]",
          "name": "",
          "type": "bytes[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_cid",
          "type": "bytes"
        }
      ],
      "name": "getAllDeals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "dealId",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "minerId",
              "type": "uint64"
            }
          ],
          "internalType": "struct IAggregatorOracle.Deal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_cid",
          "type": "bytes"
        },
        {
          "internalType": "uint64",
          "name": "epochs",
          "type": "uint64"
        }
      ],
      "name": "getExpiringDeals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "dealId",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "minerId",
              "type": "uint64"
            }
          ],
          "internalType": "struct IAggregatorOracle.Deal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "left",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "right",
          "type": "bytes32"
        }
      ],
      "name": "hashNode",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "commDs",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "offset",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "size",
              "type": "uint64"
            },
            {
              "internalType": "bytes16",
              "name": "checksum",
              "type": "bytes16"
            }
          ],
          "internalType": "struct SegmentDesc",
          "name": "sd",
          "type": "tuple"
        }
      ],
      "name": "serialize",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "_cid",
          "type": "bytes"
        }
      ],
      "name": "submit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "truncatedHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "index",
              "type": "uint64"
            },
            {
              "internalType": "bytes32[]",
              "name": "path",
              "type": "bytes32[]"
            }
          ],
          "internalType": "struct ProofData",
          "name": "proof",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        }
      ],
      "name": "verify",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]


export const newJob = async (parms) => {

    const requestReceivedTime = new Date();
    // Default end date is 1 month from the request received time
    const defaultEndDate = requestReceivedTime.setMonth(requestReceivedTime.getMonth() + 1);

    // Create a new job object from the request body
    // If certain fields are not present, use hardcoded defaults.
    let newJob = {
        cid: parms.cid,
        endDate: parms.endDate || defaultEndDate,
        jobType: parms.jobType || "all",
        replicationTarget: parms.replicationTarget || 2,
        aggregator: parms.aggregator || "lighthouse",
        epochs: parms.epochs || 4,
    };

    if (newJob.cid != null && newJob.cid != "") {
        try {
            ethers.utils.toUtf8Bytes(newJob.cid); // this will throw an error if cid is not valid bytes or hex string
        } catch {
            console.log("Error: CID must be a hexadecimal string or bytes");
            
        }
    } else {
        console.log("CID cannot be empty");
    }

    console.log("Submitting job to aggregator contract with CID: ", newJob.cid);
    await registerJob(newJob);

}


async function registerJob(newJob) {
    // TODO: Add validation for the new job, for example:
    // 1. Check if newJob is an object with all the required properties
    // 2. Check if newJob.cid is a hexadecimal string
    // 3. Check if newJob.endDate is a valid date
    // 4. Check if newJob.jobType is either 'renew' or 'replication'
    // 5. Check if newJob.replicationTarget is a number
    console.log("Executing deal creation job with CID: ", newJob.cid);

    const url_calibration_provider = process.env.URL_CALIBRATION_PROVIDER
    const privateKey = process.env.WALLET_PRIVATE_KEY
    const provider = new ethers.providers.JsonRpcProvider(url_calibration_provider);
    const signer = new ethers.Wallet(privateKey, provider);

    const dealStatus = new ethers.Contract(contractInstance, abi, signer);

    try {
        const tx = await dealStatus.submit(ethers.utils.toUtf8Bytes(newJob.cid));
        console.log(tx)
    } catch (error) {
        console.log("Error submitting deal creation job: ", error);
    }
}

export const  complete = async () => {
    await dealStatus.complete(txID, dealIDs[i], miners[i], inclusionProof, verifierData);
    console.log("Deal completed for deal ID: ", dealIDs[i]);
}

// Initialize the listener for the Data Retrieval event
async function initializeDataRetrievalListener() {
    // Create a listener for the data retrieval endpoints to complete deals
    // Event listeners for the 'done' and 'error' events
    const dealStatus = await ethers.getContractAt(contractName, contractInstance);
  
    // Listener for edge aggregator
    lighthouseAggregatorInstance.eventEmitter.on('DealReceived', async dealInfos => {
      // Process the dealInfos
      let txID = dealInfos.txID.toString();
      let dealIDs = dealInfos.dealID;
      let miners = dealInfos.miner;
      let inclusionProof = {
        proofIndex: {
          index: '0x' + dealInfos.inclusion_proof.proofIndex.index,
          path: dealInfos.inclusion_proof.proofIndex.path.map(value => '0x' + value),
        },
        proofSubtree: {
          index: '0x' + dealInfos.inclusion_proof.proofSubtree.index,
          path: dealInfos.inclusion_proof.proofSubtree.path.map(value => '0x' + value),
        },
      }
      let verifierData = dealInfos.verifier_data;
      verifierData.commPc = '0x' + verifierData.commPc;
      // The size piece is originally in hex. Convert it to a number.
      verifierData.sizePc = parseInt(verifierData.sizePc, 16);
      // Add on the dealInfos to the existing job stored inside the storedNodeJobs.
      storedNodeJobs.forEach(job => {
        if (job.txID === dealInfos.txID) {
          job.dealInfos = dealInfos;
        }
      });
      saveJobsToState();
      console.log("Deal received with dealInfos: ", dealInfos)
      try {
        // For each dealID, complete the deal
        for (let i = 0; i < dealIDs.length; i++) {
          console.log("Completing deal with deal ID: ", dealIDs[i]);
          await dealStatus.complete(txID, dealIDs[i], miners[i], inclusionProof, verifierData);
          console.log("Deal completed for deal ID: ", dealIDs[i]);
        }
      }
      catch (err) {
        console.log("Error submitting file for completion: ", err);
        // Remove the job at this stage if the deal cannot be completed
        storedNodeJobs = storedNodeJobs.filter(job => job.txID != txID);
        saveJobsToState();
      }
    });
  
    lighthouseAggregatorInstance.eventEmitter.on('Error', error => {
      console.error('An error occurred:', error);
    });
  }