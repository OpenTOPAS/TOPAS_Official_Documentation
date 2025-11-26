.. _source_volumetric:

Volumetric Source
-----------------

The Volumetric source emit particles from randomly sampled starting positions from within the radioactive volume of a given component.

This source type has been designed for Brachytherapy applications (though there may be other applications as well).

Specify source type as::

    s:So/MySource/Type = "Volumetric"

And then add an additional required parameter::

    s:So/MySource/ActiveMaterial

to specify which material within the given component should be considered radioactive.

So, for example, if you have::

    s:So/MySource/Type            = "Volumetric"
    s:So/MySource/Component       = "ActiveSource"
    sc:So/MySource/ActiveMaterial = "G4_Ir"

particles will start from randomly sampled positions within the Iridium parts of the component named ``ActiveSource``.

Examples that use this source can be found in:

* :ref:`example_brachytherapy`
* :ref:`example_VolumetricSource`

The energies and species of the emitted particles can be specified using ::

  s:So/MySource/VolumetricParticle = "gamma"
  d:So/MySource/VolumetricEnergy = 1 MeV
  u:So/MySource/VolumetricEnergySpread = 0

or if using a spectrum::

  s:So/MySource/VolumetricEnergySpectrumType = "Discreate" # Either "None", "Discreate" or "Continous" 
  dv:So/MySource/VolumetricEnergySpectrumValues = 3 50. 100. 150 MeV
  uv:So/MySource/VolumetricEnergySpectrumWeights = 3 0.2 0.6 0.2 


.. admonition:: Warning
   :class: warning

   For this source type BeamParticle, BeamEnergy, BeamEnergySpread, BeamEnergySpectrumType, Values and Weights are deprecated. Now, use the source type as prefix for these parameters.



