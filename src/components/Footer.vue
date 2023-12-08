<template>
	<footer>
		<ul>
			<li>WLD &copy; 2023</li>
			<li><a href="#">Twitter</a></li>
			<li><a href="#">YouTube</a></li>
			<li><a href="#">Instagram</a></li>
			<li><a href="#">Flickr</a></li>
			<li><a href="#">LinkedIn</a></li>
			<li><a href="#">Privacy</a></li>
			<li><a href="#">Suppliers</a></li>
		</ul>
	</footer>
</template>

<style>
	footer {
		position: relative;
		padding: 55px 0;
	}

	footer ul {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	footer ul li {
		margin-right: 30px;
		color: #aaa;
		text-transform: uppercase;
		font-size: 13px;
		line-height: 2.5;
	}

	footer ul li a {
		color: #fff;
		transition: color 0.6s;
	}

	footer ul li a:hover {
		color: #aaa;
	}
</style>
