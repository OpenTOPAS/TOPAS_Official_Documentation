.. _container_images:

Docker and Apptainer Images
===========================

OpenTOPAS v4.3.0 container tags identify the TOPAS version, Geant4 version,
and optionally the CPU architecture. The official base-image repository is
``opentopas/opentopas``.

.. note::

    Release tags become available after the corresponding images have been
    built, validated, and published to the official repository. A tag shown
    in these instructions is not evidence that publication has completed.

Selecting a version and architecture
------------------------------------

.. list-table:: Multi-architecture image selections
   :header-rows: 1
   :widths: 65 35

   * - Image
     - Use
   * - ``opentopas/opentopas:v4.3.0-geant4-11.3.2``
     - Core OpenTOPAS or local public TOPAS-nBio builds
   * - ``opentopas/opentopas:v4.3.0-geant4-11.4.2``
     - Core OpenTOPAS; default in the v4.3.0 launchers

Both selections include amd64 and arm64 images. Docker selects the host's
architecture from the combined tag. An explicit architecture tag appends
``-amd64`` or ``-arm64``, for example::

    opentopas/opentopas:v4.3.0-geant4-11.3.2-amd64
    opentopas/opentopas:v4.3.0-geant4-11.3.2-arm64
    opentopas/opentopas:v4.3.0-geant4-11.4.2-amd64
    opentopas/opentopas:v4.3.0-geant4-11.4.2-arm64

Use an explicit TOPAS/Geant4 selection instead of relying on ``:latest``
to identify compatibility. Public TOPAS-nBio chemistry currently requires
11.3.2; core OpenTOPAS supports both versions. See :ref:`version`.

Running with Docker
-------------------

The launchers are in the `OpenTOPAS docker directory`_. Run the examples below
from the directory containing your simulation inputs, adjusting the launcher
and dataset paths to your installation:

.. code-block:: bash

    /path/to/OpenTOPAS/docker/topas-docker \
      -image=opentopas/opentopas:v4.3.0-geant4-11.4.2 \
      -g4data=/path/to/G4Data-11.4.2 \
      MySimulation.txt

The host dataset directory must contain the extracted datasets matching the
selected Geant4 release. Changing ``-image=`` does not download or replace
datasets mounted through ``-g4data=``. In particular, do not use the 11.4.2
dataset list from the native quick-start guides for an 11.3.2 container.

Local TOPAS-nBio builds
-----------------------

The OpenTOPAS base image does not already contain TOPAS-nBio. Mount the
extension source and compile it with the compatible image:

.. code-block:: bash

    /path/to/OpenTOPAS/docker/topas-docker \
      -image=opentopas/opentopas:v4.3.0-geant4-11.3.2 \
      -extensions=/path/to/TOPAS-nBio \
      --build-extensions \
      -g4data=/path/to/G4Data-11.3.2 \
      MySimulation.txt

This supports local amd64 and arm64 users without using the TOPAS-nBio
publishing workflow, which remains amd64-only for remote deployments.

After the initial build, subsequent runs with the same selection can omit
``--build-extensions``. Rebuild when extension sources change. The launchers'
extension-cache keys include the source path, image selection, host
architecture, and ``DOCKER_DEFAULT_PLATFORM`` when set. Switching image tags
uses a separate cache and requires an initial extension build for that
selection. Older caches using only the source path are retained but are no
longer selected by the updated launchers.

Running with Apptainer
----------------------

On systems using Apptainer or Singularity, select the same image with a
``docker://`` URI:

.. code-block:: bash

    /path/to/OpenTOPAS/docker/topas-apptainer \
      -image=docker://opentopas/opentopas:v4.3.0-geant4-11.3.2 \
      -extensions=/path/to/TOPAS-nBio \
      --build-extensions \
      -g4data=/path/to/G4Data-11.3.2 \
      MySimulation.txt

Omit the extension options when running core OpenTOPAS. Select an image
compatible with the execution host's architecture.

Cloud execution
----------------

The container selected in an AWS Batch job definition determines the remote
TOPAS/Geant4 runtime. It can differ from the local GUI's build. The public
TOPAS-nBio AWS template selects a combined TOPAS-nBio image in ECR, rather
than the core OpenTOPAS base image. See :ref:`cloud` for details.

.. _OpenTOPAS docker directory: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/docker
