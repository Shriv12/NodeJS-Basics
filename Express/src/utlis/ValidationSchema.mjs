export const createUserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage : "User name must not be empty"
        },
        isLength: {
            options: { min: 8, max: 16},
            errorMessage: "User name must be b/w 8 and 16"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Age must not be empty"
        }
    }
}