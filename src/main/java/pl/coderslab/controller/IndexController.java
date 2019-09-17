package pl.coderslab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping(value = "/", produces = "text/html; charset=utf-8")
    public String index() {
        return "index";
    }
}
