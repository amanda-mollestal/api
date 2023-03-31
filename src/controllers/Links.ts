
// This file contains all the links for the API

export const registerLinks = {
  self: { href: '/user/register', title: 'Register a new user' },
  login: {
    href: "/user/login", method: "POST", title: "Log in to the API",
    body: {
      username: { type: "string", required: true, description: "The username of the user" },
      password: { type: "string", required: true, description: "The password of the user" }
    },
  },
}

export const loginLinks = {
  self: { href: '/user/login', title: 'Log in to the API' },
  getHabits: { href: '/habits', title: 'View all habits', method: 'GET' },
  create: {
    href: '/habits', title: 'Create a new habit', method: 'POST',
    headers: {
      "Authorization": { type: "string", required: true, description: "The access token in the format 'Bearer {access_token}'." }
    },
    body: {
      title: { type: 'string', required: true, description: 'The title of the habit' },
      description: { type: 'string', required: true, description: 'The description of the habit' },
    }
  },
  getHabit: { href: '/habits/:title', title: 'View a single habit', method: 'GET' },
  replaceHabit: { href: '/habits/:title', title: 'Update everyting in a habit', method: 'PUT' },
  updateHabit: { href: '/habits/:title', title: 'Update a habit partially', method: 'PATCH' },
  deleteHabit: { href: '/habits/:title', title: 'Delete a habit', method: 'DELETE' },
  webhookRegister: {
    href: '/habits/webhook/register',
    title: 'Register a webhook for habit events',
    method: 'POST',
    headers: {
      "Authorization": { type: "string", required: true, description: "The access token in the format 'Bearer {access_token}'." }
    },
    body: {
      id: { type: 'string', required: true, description: 'The id of the webhook to unregister' },
      url: { type: 'string', required: true, description: 'The url to send the webhook to' }
    }
  },
  webhookUnregister: {
    href: '/habits/webhook/unregister',
    title: 'Unregister a webhook',
    method: 'POST',
    headers: {
      "Authorization": { type: "string", required: true, description: "The access token in the format 'Bearer {access_token}'." }
    },
    body: {
      id: { type: 'string', required: true, description: 'The id of the webhook to unregister' }
    }
  }
}

// function that takes habitTitle and returns the links for that habit

export const createLinks = (habitTitle: string) => ({
  return: {
    self: { href: '/habits', title: 'Create a new habit' },
    getHabit: { href: `/habits/${habitTitle}`, title: 'View this habit', method: 'GET' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    updateHabit: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' }
  }
})

export const findLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}`, title: 'View this habit' },
    complete: { href: `/habits/${habitTitle}/complete`, title: 'Mark this habit as completed', method: 'POST' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    updateHabit: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits', method: 'GET' },
  }
})

export const findAllLinks = {
  self: { href: '/habits', title: 'View all habits' },
  create: { href: '/habits', title: 'Create a new habit', method: 'POST' },
  getHabit: { href: '/habits/:title', title: 'View a single habit', method: 'GET' },
  replaceHabit: { href: '/habits/:title', title: 'Update everyting in a habit', method: 'PUT' },
  updateHabit: { href: '/habits/:title', title: 'Update a habit partially', method: 'PATCH' },
  deleteHabit: { href: '/habits/:title', title: 'Delete a habit', method: 'DELETE' },
  webhookRegister: {
    href: '/habits/webhook/register',
    title: 'Register a webhook for habit events',
    method: 'POST',
    body: {
      id: { type: 'string', required: true, description: 'The id of the webhook to unregister' },
      url: { type: 'string', required: true, description: 'The url to send the webhook to' }
    }
  },
  webhookUnregister: {
    href: '/habits/webhook/unregister',
    title: 'Unregister a webhook',
    method: 'POST',
    body: {
      id: { type: 'string', required: true, description: 'The id of the webhook to unregister' }
    }
  }
}

export const completeLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}`, title: 'Mark this habit as completed' },
    revert: { href: `/habits/${habitTitle}/revert`, title: 'Undo this completion', method: 'POST' },
    getHabit: { href: `/habits/${habitTitle}`, title: 'View this habit', method: 'GET' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    updateHabit: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits', method: 'GET' }
  }
})

export const undoLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}/revert`, title: 'Undo todays completion', method: 'POST' },
    complete: { href: `/habits/${habitTitle}/complete`, title: 'Mark this habit as completed', method: 'POST' },
    getHabit: { href: `/habits/${habitTitle}`, title: 'View this habit', method: 'GET' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    updateHabit: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits', method: 'GET' },

  }
})

export const partiallyLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    getHabit: { href: `/habits/${habitTitle}`, title: 'View this habit' },
    complete: { href: `/habits/${habitTitle}/complete`, title: 'Mark this habit as completed', method: 'POST' },
    revert: { href: `/habits/${habitTitle}/revert`, title: 'Undo todays completion', method: 'POST' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits', method: 'GET' },

  }
})

export const updateLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}`, title: 'Update this habit partially', method: 'PATCH' },
    getHabit: { href: `/habits/${habitTitle}`, title: 'View this habit' },
    complete: { href: `/habits/${habitTitle}/complete`, title: 'Mark this habit as completed', method: 'POST' },
    revert: { href: `/habits/${habitTitle}/revert`, title: 'Undo todays completion', method: 'POST' },
    replaceHabit: { href: `/habits/${habitTitle}`, title: 'Update everyting in this habit', method: 'PUT' },
    deleteHabit: { href: `/habits/${habitTitle}`, title: 'Delete this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits', method: 'GET' },

  }
})

export const deleteLinks = (habitTitle: string) => ({
  return: {
    self: { href: `/habits/${habitTitle}`, title: 'Deleted this habit', method: 'DELETE' },
    getHabits: { href: '/habits', title: 'View all habits' },
    create: { href: '/habits', title: 'Create a new habit', method: 'POST' }
  }
})

export const webhookRegisterLinks = {
  return: {
    self: { href: '/habits/webhook/register', title: 'Register a webhook for habit events', method: 'POST' },
    webhookUnregister: {
      href: '/habits/webhook/unregister',
      title: 'Unregister a webhook',
      method: 'POST',
      body: {
        id: { type: 'string', required: true, description: 'The id of the webhook to unregister' }
      }
    }
  }
}



