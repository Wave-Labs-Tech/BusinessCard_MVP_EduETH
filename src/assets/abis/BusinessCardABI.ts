export const BusinessCardABI = [
	{
		"type": "constructor",
		"inputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "approve",
		"inputs": [
			{
				"name": "to",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "balanceOf",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "cardAddresses",
		"inputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "createCardFor",
		"inputs": [
			{
				"name": "tokenURI_",
				"type": "string",
				"internalType": "string"
			},
			{
				"name": "privateInfoURL_",
				"type": "string",
				"internalType": "string"
			},
			{
				"name": "for_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "createCompany",
		"inputs": [
			{
				"name": "initValues_",
				"type": "tuple",
				"internalType": "struct CompanyInit",
				"components": [
					{
						"name": "companyPhone",
						"type": "uint64",
						"internalType": "uint64"
					},
					{
						"name": "companyFoundedYear",
						"type": "uint16",
						"internalType": "uint16"
					},
					{
						"name": "companyName",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyLocation",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyWebsite",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyEmail",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyIndustry",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyCeo",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyDescription",
						"type": "string",
						"internalType": "string"
					}
				]
			}
		],
		"outputs": [],
		"stateMutability": "payable"
	},
	{
		"type": "function",
		"name": "createForCompany",
		"inputs": [
			{
				"name": "initValues_",
				"type": "tuple",
				"internalType": "struct CompanyInit",
				"components": [
					{
						"name": "companyPhone",
						"type": "uint64",
						"internalType": "uint64"
					},
					{
						"name": "companyFoundedYear",
						"type": "uint16",
						"internalType": "uint16"
					},
					{
						"name": "companyName",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyLocation",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyWebsite",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyEmail",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyIndustry",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyCeo",
						"type": "string",
						"internalType": "string"
					},
					{
						"name": "companyDescription",
						"type": "string",
						"internalType": "string"
					}
				]
			},
			{
				"name": "to_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "deleteMyCard",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "getApproved",
		"inputs": [
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCardByAddress",
		"inputs": [
			{
				"name": "owner_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "tuple",
				"internalType": "struct Card",
				"components": [
					{
						"name": "exists",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "companyID",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "numberOfContacts",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "score",
						"type": "uint64",
						"internalType": "uint64"
					},
					{
						"name": "tokenId",
						"type": "uint256",
						"internalType": "uint256"
					},
					{
						"name": "privateInfoURL",
						"type": "string",
						"internalType": "string"
					}
				]
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCompanyByOwner",
		"inputs": [
			{
				"name": "owner_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "tuple",
				"internalType": "struct Company",
				"components": [
					{
						"name": "exists",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "verified",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "companyEmployees",
						"type": "uint16",
						"internalType": "uint16"
					},
					{
						"name": "scoring",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "initValues",
						"type": "tuple",
						"internalType": "struct CompanyInit",
						"components": [
							{
								"name": "companyPhone",
								"type": "uint64",
								"internalType": "uint64"
							},
							{
								"name": "companyFoundedYear",
								"type": "uint16",
								"internalType": "uint16"
							},
							{
								"name": "companyName",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyLocation",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyWebsite",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyEmail",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyIndustry",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyCeo",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyDescription",
								"type": "string",
								"internalType": "string"
							}
						]
					}
				]
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContactInfoCard",
		"inputs": [
			{
				"name": "cardOwner",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContactsQtyByOwner",
		"inputs": [
			{
				"name": "card",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint32",
				"internalType": "uint32"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getEmployedQty",
		"inputs": [
			{
				"name": "id_",
				"type": "uint16",
				"internalType": "uint16"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint16",
				"internalType": "uint16"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getMyCard",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "tuple",
				"internalType": "struct Card",
				"components": [
					{
						"name": "exists",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "companyID",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "numberOfContacts",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "score",
						"type": "uint64",
						"internalType": "uint64"
					},
					{
						"name": "tokenId",
						"type": "uint256",
						"internalType": "uint256"
					},
					{
						"name": "privateInfoURL",
						"type": "string",
						"internalType": "string"
					}
				]
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getMyCompany",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "tuple",
				"internalType": "struct Company",
				"components": [
					{
						"name": "exists",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "verified",
						"type": "bool",
						"internalType": "bool"
					},
					{
						"name": "companyEmployees",
						"type": "uint16",
						"internalType": "uint16"
					},
					{
						"name": "scoring",
						"type": "uint32",
						"internalType": "uint32"
					},
					{
						"name": "initValues",
						"type": "tuple",
						"internalType": "struct CompanyInit",
						"components": [
							{
								"name": "companyPhone",
								"type": "uint64",
								"internalType": "uint64"
							},
							{
								"name": "companyFoundedYear",
								"type": "uint16",
								"internalType": "uint16"
							},
							{
								"name": "companyName",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyLocation",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyWebsite",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyEmail",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyIndustry",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyCeo",
								"type": "string",
								"internalType": "string"
							},
							{
								"name": "companyDescription",
								"type": "string",
								"internalType": "string"
							}
						]
					}
				]
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getMyCompanyId",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint16",
				"internalType": "uint16"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getPrivateInfoCard",
		"inputs": [
			{
				"name": "cardAddress",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getPublicCards",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "tuple[]",
				"internalType": "struct PublicCard[]",
				"components": [
					{
						"name": "owner",
						"type": "address",
						"internalType": "address"
					},
					{
						"name": "tokenURI",
						"type": "string",
						"internalType": "string"
					}
				]
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "hasShared",
		"inputs": [
			{
				"name": "from",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "to",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "isApprovedForAll",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "operator",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "isMyContact",
		"inputs": [
			{
				"name": "c_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "lastCardId",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "name",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "owner",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "ownerOf",
		"inputs": [
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "renounceOwnership",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "restoreMyCard",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "safeTransferFrom",
		"inputs": [
			{
				"name": "from",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "to",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "safeTransferFrom",
		"inputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "",
				"type": "bytes",
				"internalType": "bytes"
			}
		],
		"outputs": [],
		"stateMutability": "pure"
	},
	{
		"type": "function",
		"name": "setApprovalForAll",
		"inputs": [
			{
				"name": "operator",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "approved",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "setFeeCreateCompany",
		"inputs": [
			{
				"name": "_fee",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "setVisibilityCard",
		"inputs": [
			{
				"name": "visibility",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "shareMyCard",
		"inputs": [
			{
				"name": "to_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "supportsInterface",
		"inputs": [
			{
				"name": "interfaceId",
				"type": "bytes4",
				"internalType": "bytes4"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "symbol",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "tokenURI",
		"inputs": [
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "tokenUriByAddress",
		"inputs": [
			{
				"name": "owner_",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "transferFrom",
		"inputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "pure"
	},
	{
		"type": "function",
		"name": "transferOwnership",
		"inputs": [
			{
				"name": "newOwner",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "event",
		"name": "Approval",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "approved",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "ApprovalForAll",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "operator",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "approved",
				"type": "bool",
				"indexed": false,
				"internalType": "bool"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "BatchMetadataUpdate",
		"inputs": [
			{
				"name": "_fromTokenId",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "_toTokenId",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CardCreated",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "cardID",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CompanyCreated",
		"inputs": [
			{
				"name": "companyAddress",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "companyID",
				"type": "uint16",
				"indexed": false,
				"internalType": "uint16"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "MetadataUpdate",
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "OwnershipTransferred",
		"inputs": [
			{
				"name": "previousOwner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "newOwner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "SharedCard",
		"inputs": [
			{
				"name": "fromCard_",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			},
			{
				"name": "to_",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Transfer",
		"inputs": [
			{
				"name": "from",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "to",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "error",
		"name": "ERC721IncorrectOwner",
		"inputs": [
			{
				"name": "sender",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InsufficientApproval",
		"inputs": [
			{
				"name": "operator",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InvalidApprover",
		"inputs": [
			{
				"name": "approver",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InvalidOperator",
		"inputs": [
			{
				"name": "operator",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InvalidOwner",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InvalidReceiver",
		"inputs": [
			{
				"name": "receiver",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721InvalidSender",
		"inputs": [
			{
				"name": "sender",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC721NonexistentToken",
		"inputs": [
			{
				"name": "tokenId",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "OwnableInvalidOwner",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "OwnableUnauthorizedAccount",
		"inputs": [
			{
				"name": "account",
				"type": "address",
				"internalType": "address"
			}
		]
	}
]