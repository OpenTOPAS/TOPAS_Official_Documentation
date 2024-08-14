# TOPAS-docs

## To visualize the documentation

In order to **view the documentation locally**, use the following commands:

	git clone https://github.com/OpenTOPAS/TOPAS_Official_Documentation
	cd TOPAS_Official_Documentation
	open .build/html/index.html


## To make modifications of the documentation

The documentation is written in reStructuredText format (reST). It is hosted by [ReadTheDocs](https://docs.readthedocs.org). A good resource on reST is the [Sphinx documentation](http://www.sphinx-doc.org), but please note that not all features described there are supported by ReadTheDocs. It also describes some Python-only features, since that is its domain.

> [!WARNING]
> If working on a Mac, we recommend installing Python with [Homebrew](http://brew.sh) to avoid messing up your system Python. These instructions are only meant to be followed for substantial changes to the documentation.

You can download Python and other required Homebrew formulae as follows.

	brew install python
	brew install git
	brew install certifi

To build and view the docs locally (recommended for substantial editing), you will need to install some Python packages. In line with the aforementioned warning, we recommend first creating a Python virtual environment in your TOPAS directory.

For MacOS:
	
	cd /Applications/TOPAS
	python3 -m venv OTPythonTools

For Debian:

	cd $HOME/Applications/TOPAS
	python3 -m venv OTPythonTools

For WSL:

	cd ~/Applications/TOPAS
	python3 -m venv OTPythonTools

The remaining instructions are assuming you are on a MacOS. Following this command you should have the directory `/Applications/TOPAS/OTPythonTools/bin` within which we recommend all Python packages used by TOPAS to be installed.

> [!NOTE]
> In order to avoid having to use the full path we also advise users to create an alias for this directory. First determine which shell you are using with `echo $SHELL`. Add the following alias into either your `~/.zshrc` or `~/.bash_profile` with the following command: 

	echo "alias pipTOPAS='/Applications/TOPAS/OTPythonTools/bin/pip3'" >> ~/.zshrc

For users that do not wish to use an alias, replace `pipTOPAS` in the following commands with the full path `/Applications/TOPAS/OTPythonTools/bin/pip3`. Install the required Python packages as follows:

	pipTOPAS install sphinx sphinx-autobuild sphinx_rtd_theme
	pipTOPAS install furo
 	pipTOPAS install git+https://github.com/tmasilela/topas-pygments.git
	pipTOPAS install git+https://github.com/harshil21/furo-sphinx-search@v0.2.0.1
	pipTOPAS install myst-parser

Download the documentation:

 	git clone https://github.com/OpenTOPAS/TOPAS_Official_Documentation.git
	cd TOPAS_Official_Documentation

You can now edit any of the .txt and .rst files in the subfolders. When ready to view the changes locally, navigate to the `/TOPAS_Official_Documentation` directory and

	make clean
	make html
	open .build/html/index.html
