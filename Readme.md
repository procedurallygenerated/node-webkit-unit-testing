I put this together to help me write test cases for node-webkit, with auto-reload and recursive folder scanning.

To run this first download node webkit from https://github.com/rogerwang/node-webkit

After cloning the project, 

	cd <project_folder>
	npm install
	path-to-node-webkit/nw .

When you makes changes to the test specs the test cases will auto reload.

To put this example together i borrowed code from https://github.com/BenoitZugmeyer/chwitt/tree/5f9bc6c0b8c0328f1dc06a554e9fdd3a969c36ae/tests and added recursive folder scanning from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

http://stackoverflow.com/questions/22695072/nodewebkit-testing-using-grunt/22714843