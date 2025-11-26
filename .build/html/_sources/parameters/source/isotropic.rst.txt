.. _source_isotropic:

Isotropic Sources
~~~~~~~~~~~~~~~~~

Isotropic sources emit particles uniformly from the center of the specified ``Component``.

Specify source type as::

    s:So/MySource/Type = "Isotropic"

The energies and species of the emitted particles can be specified using ::

  s:So/MySource/IsotropicParticle = "proton"
  d:So/MySource/IsotropicEnergy = 1 MeV
  u:So/MySource/IsotropicEnergySpread = 0

or if using a spectrum::

  s:So/MySource/IsotropicEnergySpectrumType = "Discreate" # Either "None", "Discreate" or "Continous" 
  dv:So/MySource/IsotropicEnergySpectrumValues = 3 50. 100. 150 MeV
  uv:So/MySource/IsotropicEnergySpectrumWeights = 3 0.2 0.6 0.2 

.. admonition:: Warning
   :class: warning

   For this source type BeamParticle, BeamEnergy, BeamEnergySpread, BeamEnergySpectrumType, Values and Weights are deprecated. Now, use the source type as prefix for these parameters.


