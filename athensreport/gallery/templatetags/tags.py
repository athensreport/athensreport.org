from django import template

from markdown import markdown

register = template.Library()


@register.filter
def markdownify(value):
    return markdown(value)
