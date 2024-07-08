// controllers/orgController.js
const { Organisation, User } = require('../models');

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;

  // Validate input data
  if (!name) {
    return res.status(422).json({
      errors: [{ field: 'name', message: 'Name is required' }]
    });
  }

  try {
    // Create organisation
    const org = await Organisation.create({
      orgId: `org_${Date.now()}`,
      name,
      description,
    });

    // Add user to organisation
    const user = await User.findByPk(userId);
    await org.addUser(user);

    // Return successful response
    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: org.orgId,
        name: org.name,
        description: org.description,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 400,
    });
  }
};

exports.getOrganisations = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId, {
      include: Organisation
    });

    // Return successful response
    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations: user.Organisations,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 400,
    });
  }
};
