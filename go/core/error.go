package core

type Magic8BallError struct {
	IsMagic8BallError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMagic8BallError(code string, msg string, ctx *Context) *Magic8BallError {
	return &Magic8BallError{
		IsMagic8BallError: true,
		Sdk:              "Magic8Ball",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Magic8BallError) Error() string {
	return e.Msg
}
