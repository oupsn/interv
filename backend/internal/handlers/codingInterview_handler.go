package handlers

import (
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

// @Summary Generate compile token for a coding interview
// @Description Generate compile token for a coding interview
// @Tags codingInterview
// @ID GenerateCompileToken
// @Accept json
// @Produce json
// @Param body body CodingInterviewGenerateCompileTokenQuery true "Request body containing the code to be compiled"
// @Success 200 {object} Response[CodingInterviewGenerateCompileTokenResponse] "Successful response with the compile token"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.generateCompileToken [post]
func (co CodingInterviewHandler) GenerateCompileToken(c *fiber.Ctx) error {
	var req CodingInterviewGenerateCompileTokenQuery
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	res, err := co.codingInterviewService.GenerateCompileToken(req.Body)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, CodingInterviewGenerateCompileTokenResponse{
		Token: res,
	})

}

// @Summary Get compile result for a coding interview
// @Description Get compile result for a coding interview
// @Tags codingInterview
// @ID GetCompileResult
// @Accept json
// @Produce json
// @Param token path string true "Token to get the compile result"
// @Success 200 {object} Response[CodingInterviewGetCompileResultResponse] "Successful response with the compile result"
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /codingInterview.getCompileResult/{token} [get]
func (co CodingInterviewHandler) GetCompileResult(c *fiber.Ctx) error {
	token := c.Params("token")

	res, err := co.codingInterviewService.GetCompileResult(token)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return Ok(c, CodingInterviewGetCompileResultResponse{
		CompileResult: res,
	})
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
