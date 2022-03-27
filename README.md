# M-NFT  Evolution of NFT
### Description

"MNFT" is a modified smart contract technology (M-NFT) for NFT tokens. Created and transferred to M-NFT tokens can place an additional layer (mask) on top of the original image. The technology will allow modifying NFT to meet the demands of the advertising business, and can also be used in crypto-gaming, collective creativity and copyright protection. NFT tokens can be both created and transferred to M-NFT using the service of the same name.
### Installing and running
```
git clone https://github.com/senitskiy/M-NFT/M-NFT.git
yarn install
yarn start
```
### Don't forget to create the file
.env
```
REACT_APP_WEB3_STORAGE_KEY = ...
```

### Run backend 

```
cd backend
pip install -r req.txt 
cd mnft
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
URL for request: http://localhost:8000/graphql


### GraphQL 
#### Query:
- getAllNFT
- getNFT(address)
- getAllUser
- getUser(address)

#### Mutation
- createMNFT(input)
- updateMNFT(address, input)
- createUser(input)
- updateUser(address, input)
- createOrUpdate(address, input)

