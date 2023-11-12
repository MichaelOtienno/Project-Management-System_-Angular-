-- use projectManagementSystem
-- select * from Projects
-- drop PROCEDURE updateProject

CREATE PROCEDURE updateProject
    @projectID VARCHAR(300),
    @projectName VARCHAR(250),
    @projectDescription VARCHAR(500),
    @endDate DATE,
    @AssignedUserEmail VARCHAR(250),
    @AssignedUserName VARCHAR(250)
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Projects
        WHERE projectID = @projectID
    )
    BEGIN
        -- Check if the user exists
        IF EXISTS (
            SELECT 1
            FROM Users
            WHERE email = @AssignedUserEmail  
            
        )
        BEGIN
            -- Check if the user is already assigned to an active project
            IF EXISTS (
                SELECT 1
                FROM Projects
                WHERE AssignedUserEmail = @AssignedUserEmail
                AND isCompleted = 0
                AND projectID <> @projectID
            )
            BEGIN
                SELECT -1 AS AssignmentResult; -- User is already assigned to an active project
            END
            ELSE
            BEGIN
                -- Check if the user is not assigned to any other project
                IF NOT EXISTS (
                    SELECT 1
                    FROM Projects
                    WHERE AssignedUserEmail = @AssignedUserEmail
                    AND isCompleted = 0
                    AND projectID <> @projectID
                )
                BEGIN
                    -- Update the project details
                    UPDATE Projects
                    SET
                        projectName = @projectName,
                        projectDescription = @projectDescription,
                        endDate = @endDate,
                        AssignedUserEmail = @AssignedUserEmail,
                        AssignedUserName = @AssignedUserName
                    WHERE projectID = @projectID;

                    SELECT @projectID AS UpdatedProjectID;
                END
                ELSE
                BEGIN
                    SELECT -4 AS AssignmentResult; -- User is already assigned to another active project
                END
            END
        END
        ELSE
        BEGIN
            SELECT -2 AS AssignmentResult; -- User doesn't exist in the Users table
        END
    END
    ELSE
    BEGIN
        SELECT -3 AS AssignmentResult; -- Project with the given ID doesn't exist
    END
END
