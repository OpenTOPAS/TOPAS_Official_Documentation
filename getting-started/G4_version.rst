.. _version:

Geant4 Versions and Compatibility
=================================

OpenTOPAS v4.3.0 supports Geant4_ 11.3.2 and 11.4.2. Full core regression
testing has been completed with both versions.

.. list-table:: Compatibility for OpenTOPAS v4.3.0
   :header-rows: 1
   :widths: 45 25 30

   * - Configuration
     - Geant4 11.3.2
     - Geant4 11.4.2
   * - Core OpenTOPAS
     - Supported
     - Supported
   * - OpenTOPAS with public TOPAS-nBio
     - Supported
     - Currently incompatible (chemistry)

The installation guides use 11.4.2 for core OpenTOPAS. Select 11.3.2 when
building with public TOPAS-nBio. This extension restriction does not prevent
core OpenTOPAS from using 11.4.2.

For a native 11.3.2 installation, use that release's source archive and source
directory in the Geant4 build commands, and download the datasets for 11.3.2
instead of the 11.4.2 dataset list in the guides. Use separate build and install
directories when retaining both versions, and point OpenTOPAS's
``Geant4_DIR`` to the intended installation. Dataset versions are independent
of the TOPAS version and must match the selected Geant4 release.

Some optional parameters require Geant4 11.4; their parameter-reference pages
describe those requirements. Core compatibility with both releases does not
make every Geant4-specific option available in both.

For containers, see :ref:`container_images`. For remote jobs, the selected
container determines the Geant4 version, independently of the local GUI;
see :ref:`cloud`.

For earlier TOPAS versions, see the `old documentation`_.

.. warning::

    Compatibility testing applies to the versions listed above. Other Geant4
    releases are not covered by this compatibility statement.

.. _Geant4: https://geant4.web.cern.ch
.. _old documentation: https://topas.readthedocs.io/en/latest/
