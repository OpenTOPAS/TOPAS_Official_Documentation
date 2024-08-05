.. _extension_outcome:

Custom Outcome Models
=====================

.. highlight:: c++

The first line of the c.c file must be of the form::

    // Outcome Model for MyOutcomeModel1

Your custom outcome model can perform whatever analysis you wish from an TOPAS DVH.
The work is all in your Initialize method. See the outcome_ modeling folder of the TOPAS GitHub page.

.. _outcome: https://github.com/OpenTOPAS/OpenTOPAS/tree/main/outcome