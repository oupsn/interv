package handlers

import (
	"strconv"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type CodingInterviewHandler struct {
	codingInterviewService services.ICodingInterviewService
}

func NewCodingInterviewHandler(codingInterviewService services.ICodingInterviewService) CodingInterviewHandler {
	return CodingInterviewHandler{
		codingInterviewService: codingInterviewService,
	}
}

// @Summary Get compile result for a coding interview
// @Description Get compile result for a coding interview
// @Tags codingInterview
// @ID GetCompileResult
// @Accept json
// @Produce json
// @Param body body CodingInterviewGetCompileResultQuery true "Request body containing the token to get the compile result"
// @Success 200 {object} Response[CodingInterviewGetCompileResultResponse] "Successful response with the compile result"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.getCompileResult [post]
func (co CodingInterviewHandler) GetCompileResult(c *fiber.Ctx) error {
	var req CodingInterviewGetCompileResultQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	res, err := co.codingInterviewService.GetCompileResult(req.Body)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, res)
}

// @Summary Get coding interview questions
// @Description Get coding interview questions
// @Tags codingInterview
// @ID GetQuestions
// @Accept json
// @Produce json
// @Success 200 {object} Response[CodingInterviewGetQuestionsResponse] "Successful response with the coding interview questions"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.getQuestions [get]
func (co CodingInterviewHandler) GetQuestions(c *fiber.Ctx) error {
	questions, err := co.codingInterviewService.GetCodingInterviewQuestions()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, questions)
}

// @Summary Get coding interview question by title
// @Description Get coding interview question by title
// @Tags codingInterview
// @ID GetQuestionByTitle
// @Accept json
// @Produce json
// @Param title path string true "Question Title"
// @Success 200 {object} Response[CodingInterviewGetQuestionByTitleResponse] "Successful response with the coding interview question by title"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.getQuestionByTitle/{title} [get]
func (co CodingInterviewHandler) GetQuestionByTitle(c *fiber.Ctx) error {
	title := c.Params("title")
	question, err := co.codingInterviewService.GetCodingInterviewQuestionByTitle(title)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	return Ok(c, question)
}

// @Summary Get coding interview questions in a portal
// @Description Get coding interview questions in a portal
// @Tags codingInterview
// @ID GetQuestionsInPortal
// @Accept json
// @Produce json
// @Param portalId path int true "Portal ID"
// @Success 200 {object} Response[CodingInterviewGetQuestionsInPortalResponse] "Successful response with the coding interview questions in a portal"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.getQuestionsInPortal/{portalId} [get]
func (co CodingInterviewHandler) GetQuestionsInPortal(c *fiber.Ctx) error {
	portalID, err := strconv.Atoi(c.Params("portalId"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	questions, err := co.codingInterviewService.GetCodingInterviewQuestionsInPortal(portalID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	return Ok(c, questions)
}

// @Summary Create a new coding interview question
// @Description Create a new coding interview question
// @Tags codingInterview
// @ID CreateQuestion
// @Accept json
// @Produce json
// @Param body body CodingInterviewCreateQuestionQuery true "Request body containing the new question details"
// @Success 200 {object} Response[domains.CodingQuestion] "Successful response with the created question"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.createQuestion [post]
func (co CodingInterviewHandler) CreateQuestion(c *fiber.Ctx) error {
	var req CodingInterviewCreateQuestionQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	question, err := co.codingInterviewService.CreateCodingQuestion(
		domains.CodingQuestion{
			Title:             req.Body.Title,
			Description:       req.Body.Description,
			InputDescription:  req.Body.InputDescription,
			OutputDescription: req.Body.OutputDescription,
			TestCases:         req.Body.TestCases,
			Difficulty:        req.Body.Difficulty,
		},
	)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, question)

}

// @Summary Add a coding interview question to a target
// @Description Add a coding interview question to a target
// @Tags codingInterview
// @ID AddQuestion
// @Accept json
// @Produce json
// @Param body body CodingInterviewAddQuestionQuery true "Request body containing the coding question ID, target, and target ID"
// @Success 200 {object} Response[string] "Successful response with a message"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.addQuestion [post]
func (co CodingInterviewHandler) AddQuestion(c *fiber.Ctx) error {
	var req CodingInterviewAddQuestionQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	err := co.codingInterviewService.AddCodingQuestion(uint(req.CodingQuestionID), req.Target, uint(req.TargetID))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, "Coding question added to portal successfully")
}

// @Summary Create a new coding interview question snapshot
// @Description Create a new coding interview question snapshot
// @Tags codingInterview
// @ID CreateQuestionSnapshot
// @Accept json
// @Produce json
// @Param body body CodingInterviewCreateQuestionSnapshotQuery true "Request body containing the coding question snapshots"
// @Success 200 {object} Response[string] "Successful response with a message"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.createQuestionSnapshot [post]
func (co CodingInterviewHandler) CreateCodingQuestionSnapshot(c *fiber.Ctx) error {
	var req CodingInterviewCreateQuestionSnapshotQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	_, err := co.codingInterviewService.CreateCodingSnapshot(req)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, "Coding question snapshot created successfully")
}

// @Summary Update a coding interview question
// @Description Update a coding interview question
// @Tags codingInterview
// @ID UpdateQuestion
// @Accept json
// @Produce json
// @Param codingQuestionID path int true "Coding Question ID"
// @Param body body CodingInterviewUpdateQuestionQuery true "Request body containing the updated question details"
// @Success 200 {object} Response[domains.CodingQuestion] "Successful response with the updated question"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.updateQuestion/{codingQuestionID} [put]
func (co CodingInterviewHandler) UpdateQuestion(c *fiber.Ctx) error {
	var req CodingInterviewUpdateQuestionQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	question, err := co.codingInterviewService.UpdateCodingQuestion(uint(req.CodingQuestionID), domains.CodingQuestion{
		Title:             req.Body.Title,
		Description:       req.Body.Description,
		InputDescription:  req.Body.InputDescription,
		OutputDescription: req.Body.OutputDescription,
		TestCases:         req.Body.TestCases,
		Difficulty:        req.Body.Difficulty,
	})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, question)
}

// @Summary Delete a coding interview question
// @Description Delete a coding interview question
// @Tags codingInterview
// @ID DeleteQuestion
// @Accept json
// @Produce json
// @Param codingQuestionID path int true "Coding Question ID"
// @Success 200 {object} Response[string] "Successful response with a message"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.deleteQuestion/{codingQuestionID} [delete]
func (co CodingInterviewHandler) DeleteQuestion(c *fiber.Ctx) error {
	codingQuestionID, err := strconv.Atoi(c.Params("codingQuestionID"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	err = co.codingInterviewService.DeleteCodingQuestion(uint(codingQuestionID))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, "Coding question deleted successfully")
}
