.. _source_distributed:

Distributed Source
------------------

The Distributed source represents radioactive material randomly distributed within other material.
The user specifies how many random source points to sample within the component.
The particle generator will then start equal numbers of histories from each of these source points.

The Distributed Source is in many ways similar to the Volumetric Source.
But whereas the Volumetric Source samples a new point every time it generates a particle
(to simulate random activity within a volume of radioactive material),
the Distributed Source does this sampling only a the construction phase
(to simulate a random distribution of radioactive particles within some other material).

Specify source type as::

    s:So/Example/Type = "Volumetric"

Additional required Parameters for the Distributed Source are::

    s:So/Example/Component = "DemoSphere"
    i:So/Example/NumberOfHistoriesInRun = 5
    i:So/Example/NumberOfSourcePoints = 4
    b:So/Example/RedistributePointsOnNewHistory = "False"
    s:So/Example/PointDistribution = "Gaussian" # default to "Flat"
    d:So/Example/PointDistributionSigma = 20. mm

And then the usual other parameters to control particle type, energy, etc., such as::

    s:So/Example/VolumetricParticle = "gamma"
    d:So/Example/VolumetricEnergy = 10. keV
    u:So/Example/VolumetricEnergySpread = 0.

or if using a spectrum::

    s:So/Example/VolumetricEnergySpectrumType = "Discreate" # Either "None", "Discreate" or "Continous" 
    dv:So/Example/VolumetricEnergySpectrumValues = 3 50. 100. 150 MeV
    uv:So/Example/VolumetricEnergySpectrumWeights = 3 0.2 0.6 0.2 

.. admonition:: Warning
   :class: warning

   For this source type BeamParticle, BeamEnergy, BeamEnergySpread, BeamEnergySpectrumType, Values and Weights are deprecated. Now, use the source type as prefix for these parameters.

Examples that use this source can be found in:

* :ref:`example_DistributedSourcePointsInShell`
* :ref:`example_DistributedSourcePointsInSphere`
* :ref:`example_DistributedSourcePointsInSphereGaussian`
* :ref:`example_DistributedSourcePointsInTwistedTubs`
