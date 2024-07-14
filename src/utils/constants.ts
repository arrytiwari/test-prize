export  const PRIZE_FACTORY_ABI = [
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
				"internalType": "address",
				"name": "prizeAddress",
				"type": "address"
			}
		],
		"name": "NewPrizeCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_proposer",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_platformAdmins",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "_platFormFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_proposerFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_contractId",
				"type": "uint256"
			}
		],
		"name": "createViaPrize",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const;