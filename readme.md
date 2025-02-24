# *ImageRearranger* Jupyter Notebook

*Arrange a grid of images into a mosaic according to their similarity.*

![overview.png](overview.png)

[**This notebook**](ImageRearranger.ipynb):

1. Loads a collection of images (either as a zipped file, a directory, or in the form of a single mosaic image).
2. Computes high-dimensional features which describe the images (either using an [image pyramid](https://en.wikipedia.org/wiki/Pyramid_(image_processing)), or a neural network).
3. [Reduces the dimensionality](https://en.wikipedia.org/wiki/Nonlinear_dimensionality_reduction) of those features to a 2D point cloud (either using [UMAP](https://umap-learn.readthedocs.io/en/latest/) or [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding))
4. Rectifies the 2D point cloud into a grid (by solving the [Linear Assignment Problem](https://en.wikipedia.org/wiki/Assignment_problem)), using that grid to produce an ordered mosaic of the input images.

---

## Credits

* Originally based on Kyle McDonald's [ImageRearranger](https://github.com/kylemcdonald/ImageRearranger/tree/master?tab=readme-ov-file).
* Includes code from Kyle McDonald's [python-utils](https://github.com/kylemcdonald/python-utils) repository. 
* Inspired by [this collection](https://twitter.com/JUSTIN_CYR/status/829196024631681024) of pixel art by Justin Cyr.
* Demo includes tiles of the [Kress Collection](https://www.kressfoundation.org/kress-collection) at the US National Gallery of Art
* Updates & Extensions by Golan Levin, February 2025


---

## Installation Instructions

* You will need Python 3.11 or newer. *This repo was developed with Python 3.13 on MacOSX 14.5.*
  * First, **check** if Python3 is installed. Run: `python3 --version`
  * If you see output like `Python 3.x.x`, then Python is installed. If not, install it via Homebrew: `brew install python`
  * Then **verify**: `python3 --version`
* **Download** [this repository](https://github.com/golanlevin/ImageRearranger):
  * (**Option 1: Download as ZIP**) In GitHub, **click** on the green "Code" button in the upper right and **select** "Download ZIP" from the pulldown that appears). This will download a zip file to your computer. **Unzip** the compressed file. I recommend that you **rename** the folder to `ImageRearranger/`.
  * (**Option 2: Clone via Git**) In your terminal, **navigate** to where you want to save the repository, and run this command to clone it: `git clone https://github.com/golanlevin/ImageRearranger.git`
* At your Terminal prompt, **change directory** to that folder: `cd ImageRearranger`
* Because this notebook requires the installation of numerous Python libraries, *working in a virtual environment (venv) is extremely strongly recommended*. **Create** a virtual environment, such as: `mosaicVenv`:
  * Mac: `python3 -m venv mosaicVenv`
  * Win: `python -m venv mosaicVenv`
* **Activate** the `mosaicVenv` virtual environment:
  * Mac: `source mosaicVenv/bin/activate`
  * Win: `mosaicVenv\Scripts\activate`
* Before we install necessary libraries, it's optional but recommended that you **upgrade** pip first: `pip install --upgrade pip`
* **Install** all required packages (making sure that `mosaicVenv` is activated first!): `pip install -r requirements.txt`.
  * This will install: `numpy scipy scikit-learn Pillow jupyter matplotlib opencv-python scikit-image umap-learn torch torchvision
git+https://github.com/gatagat/lap.git`
  * You won't need to re-install libraries the next time you activate the virtual environment.
* You should now be able to **launch** the [ImageRearranger.ipynb](ImageRearranger.ipynb) Jupyter Notebook (if you haven't already) with `jupyter notebook`
  * This will open `http://localhost:8888/tree`
  * From there, **open** `http://localhost:8888/notebooks/ImageRearranger.ipynb`
* **Step through** this notebook! You can step through this notebook using options in the Run menu. I recommend stepping through cell by cell with **Shift-Return**.

