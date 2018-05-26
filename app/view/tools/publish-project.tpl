{% extends "../common/page-frame.tpl" %}

{% block body %}
<style>
    code {
        white-space: pre-line;
    }
</style>
<div data-page="publish-project">
    <h2>welcome</h2>
    <p>here is publish-project</p>
    <code> {{ msg }} </code>
</div>

{% if code == 1 %}
<script>
    setTimeout(function() {
        location.reload();
    }, 2000);
</script>
{% endif %}

{% endblock %}