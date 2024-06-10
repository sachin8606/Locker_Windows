# Here are the steps to run the project :
1. Clone the repo.
2. cd to your cloned repo folder.
3. run npm install on your terminal.
4. add env.json in the folder structure and add username and password object.
   Something like : {"name":"sachin","pass":"1234"}
5. Now to run the project in your localhost, run the command:
   node_modules\electron\dist\electron.exe main.js
6.The project should successfully run.Enter the name and password that you saved in env.json file discussed in step 4.


# To create .exe of this electron app, run the command
> npx electron-packager . MyElectronApp --platform=win32 --arch=x64 --out=dist --icon=build/icon.ico --overwrite
1. .MyElectronApp is the name of your window application.It is custonizable.
2. --out=dist is the directory where files and .exe will be saved.
   
  
   
