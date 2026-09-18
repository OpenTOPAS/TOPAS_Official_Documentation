.. _cloud:

Cloud
-----

Welcome to the cloud section of the TOPAS documentation. We have added cloud capabilities to the GUI of OpenTOPAS which allows you to run your simulations using AWS compute resources.

This implementation is based on the infrastructure and workflows recently released by TOPAS-nBio. Consequently, you are required to go through 
the setup steps described in the TOPAS-nBio `documentation <https://topas-nbio.readthedocs.io/en/latest/Cloud/CloudOverview.html>`_ before being able 
to use this feature in the GUI. 

If you are fine using the official images released by the TOPAS collaboration, you can skip steps 2 and 3 and only complete steps 1 and 4. 
Through the GUI you are able to complete steps 5-7 in the guide, which corresponds to setting up your AWS resources (i.e. choosing the compute 
resources you would like to allocate, setting up your job, choosing input files, and submitting and monitoring your simulations).

.. note::
    Although steps 5-7 can be completed entirely through the GUI, if you are a **first time user** of AWS compute resources 
    we recommend you follow these steps as described in the TOPAS-nBio `documentation <https://topas-nbio.readthedocs.io/en/latest/Cloud/CloudOverview.html>`_ 
    to have a better understanding of the underlying infrastructure and workflows.

.. warning::
    As the use of AWS compute resources is a paid service, The TOPAS collaboration is not responsible for any charges incurred while using the 
    cloud capabilities of the OpenTOPAS GUI. Please refer to the AWS `billing page <https://aws.amazon.com/aws-cost-management/aws-billing/>`_ 
    for more information on how to manage your AWS costs.

Container version used by a cloud job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The cloud icon submits a job through AWS Batch. The simulation uses the TOPAS,
extensions, Geant4 libraries, and datasets installed in the selected remote
container. It does not use the Geant4 libraries from the local GUI installation.

For example, a local OpenTOPAS GUI built with Geant4 11.4.2 can submit a job
to a TOPAS-nBio container built with Geant4 11.3.2. That remote simulation
runs with 11.3.2. Input parameters and required extensions must be supported
by the remote build; submitting a job does not make its physics configuration
identical to a simulation run locally with another Geant4 version.

The current public TOPAS-nBio AWS configuration uses Geant4 11.3.2 and amd64.
Its chemistry is currently incompatible with Geant4 11.4.2. Core OpenTOPAS
supports both releases; see :ref:`version`.

The simulation image is selected by ``containerProperties.image`` in the
AWS Batch job definition. The updated TOPAS-nBio template selects::

    public.ecr.aws/q0u0d8d4/topas-nbio:topas-v4.3.0-geant4-11.3.2-amd64

Here, ``topas-v4.3.0`` identifies the OpenTOPAS base version, not a TOPAS-nBio
release number. Use the tag only after that image has been published to ECR.
The postprocessing job uses the separate ``:postprocessing`` tag.

When reusing existing AWS resources, inspect the registered job definition:
it may still select an older image or ``:latest``. Editing a local JSON
template alone does not change an existing AWS job definition. Register a
new revision and select that revision when updating the remote runtime.

Publishing and testing
~~~~~~~~~~~~~~~~~~~~~~

OpenTOPAS base images are built and validated before they are made available
in the official ``opentopas/opentopas`` Docker Hub repository. The public
TOPAS-nBio ECR workflow rebuilds with
``opentopas/opentopas:v4.3.0-geant4-11.3.2-amd64`` and publishes the combined
image to ECR when manually triggered. TOPAS-nBio CI runs separately;
publication is not automatically gated by a successful CI run and does not
reuse a CI-produced image.

The optional TOPAS-nBio Docker Hub publishing workflow is independent of
this ECR workflow. AWS Batch does not require an intermediate TOPAS-nBio
image on Docker Hub. See the
`TOPAS-nBio AWS setup notes <https://github.com/topas-nbio/TOPAS-nBio/blob/main/aws/README.md>`_
for the image naming and publishing configuration.

TOPAS AWS cloud wizard
~~~~~~~~~~~~~~~~~~~~~~

The TOPAS AWS cloud wizard can be started by clicking the cloud icon in the GUI. Ensure that your AWS account is authenticated 
(`step 4 <https://topas-nbio.readthedocs.io/en/latest/Cloud/CloudOverview.html>`_) and that you've run the  
command ``aws login`` in the terminal tab before launching OpenTOPAS with your parameter file.

.. figure:: ./images/welcome.png
    :alt: Cloud wizard welcome
    :width: 100%
    :align: center

You need to provide the directory containing the aws scripts on the next page. If you've completed the setup steps correctly, your AWS profile 
and region should be automatically filled. 

.. figure:: ./images/profile.png
    :alt: AWS scripts folder
    :width: 80%
    :align: center

You will then be asked for "default" vs "advanced" mode. For new users, recommend default since the already provided scripts as templates. 
The advanced mode allows you to directly edit the raw JSON or bash scripts for more fine-tuned control. 

The next set of steps will prompt you to either use existing AWS resources or create new ones. In other words, if you've already gone through the process of launching 
OpenTOPAS/TOPAS-nBio simulations on AWS, you will already have these resources set up and can save time by re-using them. Alternatively, 
you have the option of creating new versions. It is likely that you'll want to choose this option if, for example, the simulations you want 
to launch require significantly more/less computing resources than the simulations you previously launched. The image below is shown for AWS 
`S3 buckets`, but the same window will appear for you to make a decision about the `compute environment`, `job queue`, `job definitions`, 
and CloudWatch `log group`.

.. figure:: ./images/create.png
    :alt: Select existing or create new
    :width: 80%
    :align: center

Once you've decided to use existing or create new AWS resources you will be taken to the job submission page. This page has fields that are 
pre-filled based on the AWS resources you selected, and if you chose to use the parameter file you opened or the template submission script.

.. figure:: ./images/submission.png
    :alt: Job submission
    :width: 80%
    :align: center

You will then be taken to a monitoring page where you can see the status of your submitted jobs.

.. figure:: ./images/monitor.png
    :alt: Job monitoring
    :width: 80%
    :align: center

Once your jobs are completed you will be redirected to a page to download your results and, if you selected the option to postprocess your results, 
you will also have the option to submit a postprocessing job using your own local script.

.. figure:: ./images/postprocess.png
    :alt: Postprocess
    :width: 80%
    :align: center

.. note::
    Should you encounter any bugs/features which don't quite work as expected, please communicate the issue on our 
    `GitHub page <https://github.com/OpenTOPAS/OpenTOPAS>`_.
